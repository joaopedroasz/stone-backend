export const env = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
  },
  server: {
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 4001
  }
}
