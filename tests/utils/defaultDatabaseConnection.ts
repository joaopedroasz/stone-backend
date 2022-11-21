import { RedisConnectionSingleton } from '@/infra/database'

const host: string = process.env.REDIS_HOST ?? 'localhost'
const port: number = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6378

const connection = RedisConnectionSingleton.getInstance({ host, port })

export { connection }
