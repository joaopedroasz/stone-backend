export const env = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT) ?? 6378
  },
  server: {
    port: Number(process.env.SERVER_PORT) ?? 3000
  }
}
