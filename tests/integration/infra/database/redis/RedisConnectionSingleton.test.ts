import { Redis } from 'ioredis'

import { RedisConnectionSingleton } from '@/infra/database'

describe('RedisConnectionSingleton', () => {
  const host = 'localhost'
  const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6378

  let sut: Redis

  beforeAll(() => {
    sut = RedisConnectionSingleton.getInstance({
      host,
      port
    })
  })

  afterAll(async () => {
    sut.disconnect()
  })

  it('should be a singleton', () => {
    expect(sut).toBe(RedisConnectionSingleton.getInstance({ port, host }))
  })
})
