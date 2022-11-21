import Redis from 'ioredis'

import { ConnectionNotEstablishedError, RedisConnectionSingleton } from '@/infra/database'

jest.mock('ioredis', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('RedisConnectionSingleton', () => {
  let getSpy: jest.Mock
  let setSpy: jest.Mock
  let disconnectSpy: jest.Mock
  let redisSpy: jest.Mock

  const host = 'localhost'
  const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6378

  let sut: RedisConnectionSingleton

  beforeAll(() => {
    getSpy = jest.fn().mockResolvedValue('any_value')
    setSpy = jest.fn().mockResolvedValue('OK')
    disconnectSpy = jest.fn()
    redisSpy = jest.fn().mockReturnValue({
      get: getSpy,
      set: setSpy,
      disconnect: disconnectSpy
    })
    jest.mocked(Redis).mockImplementation(redisSpy)
  })

  beforeEach(async () => {
    sut = RedisConnectionSingleton.getInstance({ host, port })
  })

  it('should have only one instance', () => {
    expect(sut).toBe(RedisConnectionSingleton.getInstance({ port, host }))
  })

  it('should crate only one connection', async () => {
    await sut.connect()
    await sut.connect()

    expect(redisSpy).toHaveBeenCalled()
    expect(redisSpy).toHaveBeenCalledTimes(1)
  })

  it('should call disconnect only once', async () => {
    await sut.connect()

    await sut.disconnect()
    await sut.disconnect()

    expect(disconnectSpy).toHaveBeenCalledTimes(1)
  })

  it('should call get with correct value', async () => {
    await sut.connect()

    await sut.get('any_key')

    expect(getSpy).toHaveBeenCalledWith('any_key')
  })

  it('should call set with correct value', async () => {
    await sut.connect()

    await sut.set('any_key', 'any_value')

    expect(setSpy).toHaveBeenCalledWith('any_key', 'any_value')
  })

  it('should return undefined if get returns null', async () => {
    getSpy.mockResolvedValueOnce(null)
    await sut.connect()

    const result = await sut.get('any_key')

    expect(result).toBeUndefined()
  })

  it('should return true if set returns OK', async () => {
    await sut.connect()

    const result = await sut.set('any_key', 'any_value')

    expect(result).toBeTruthy()
  })

  it('should return false if set returns null', async () => {
    setSpy.mockResolvedValueOnce(null)
    await sut.connect()

    const result = await sut.set('any_key', 'any_value')

    expect(result).toBeFalsy()
  })

  it('should throw ConnectionNotEstablishedError if get is called before connect', async () => {
    await sut.disconnect()
    const promise = sut.get('any_key')

    await expect(promise).rejects.toThrowError(new ConnectionNotEstablishedError())
  })

  it('should throw ConnectionNotEstablishedError if set is called before connect', async () => {
    await sut.disconnect()
    const promise = sut.set('any_key', 'any_value')

    await expect(promise).rejects.toThrowError(new ConnectionNotEstablishedError())
  })
})