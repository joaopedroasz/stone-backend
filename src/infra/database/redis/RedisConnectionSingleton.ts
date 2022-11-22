import Redis from 'ioredis'
import { DatabaseConnection } from '../contracts'
import { ConnectionNotEstablishedError } from '../errors'

export type RedisConnectionProps = {
  host: string
  port: number
}

export class RedisConnectionSingleton implements DatabaseConnection {
  private static instance?: RedisConnectionSingleton

  private connection?: Redis
  private readonly host: string
  private readonly port: number

  private constructor ({ host, port }: RedisConnectionProps) {
    this.host = host
    this.port = port
  }

  public static getInstance (props: RedisConnectionProps): RedisConnectionSingleton {
    if (!RedisConnectionSingleton.instance) RedisConnectionSingleton.instance = new RedisConnectionSingleton(props)
    return RedisConnectionSingleton.instance
  }

  public async connect (): Promise<void> {
    if (this.connection) return

    this.connection = new Redis({
      host: this.host,
      port: this.port
    })
  }

  public async disconnect (): Promise<void> {
    if (!this.connection) return
    await this.connection.disconnect()
    this.connection = undefined
  }

  public async get (key: string): Promise<string | undefined> {
    if (!this.connection) throw new ConnectionNotEstablishedError()
    const result = await this.connection.get(key)
    return result ?? undefined
  }

  public async set (key: string, value: string): Promise<boolean> {
    if (!this.connection) throw new ConnectionNotEstablishedError()
    return !!await this.connection.set(key, value)
  }

  public async delete (key: string): Promise<boolean> {
    if (!this.connection) throw new ConnectionNotEstablishedError()
    return !!await this.connection.del(key)
  }
}
