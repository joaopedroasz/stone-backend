import Redis from 'ioredis'

export type RedisConnectionProps = {
  host?: string
  port: number
}

export class RedisConnectionSingleton {
  private static instance: Redis

  private constructor () {}

  public static getInstance ({
    host = 'localhost',
    port
  }: RedisConnectionProps): Redis {
    if (!RedisConnectionSingleton.instance) {
      RedisConnectionSingleton.instance = new Redis({ host, port })
    }

    return RedisConnectionSingleton.instance
  }
}
