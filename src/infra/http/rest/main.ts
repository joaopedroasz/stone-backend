import './config/moduleAlias'
import { RedisConnectionSingleton } from '@/infra/database'
import { ServerHttpRestExpressAdapter } from './express'
import { env, startServer } from './config'

const serverHttpRestExpressAdapter = new ServerHttpRestExpressAdapter()
const redisConnection = RedisConnectionSingleton.getInstance({
  host: env.redis.host,
  port: env.redis.port
})

startServer({
  serverHttpRest: serverHttpRestExpressAdapter,
  databaseConnection: redisConnection,
  port: env.server.port
})
  .catch(async error => {
    await redisConnection.disconnect()
    console.error(error)
    process.exit(1)
  })
