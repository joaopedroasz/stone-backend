import request from 'supertest'

import { LoadCustomerByIdRoute, ServerHttpRestExpressAdapter } from '@/infra/http'
import { connection } from '@/tests/utils'
import { ConnectionNotEstablishedError } from '@/infra/database'

describe('LoadCustomerByIdRoute', () => {
  const server = new ServerHttpRestExpressAdapter()
  new LoadCustomerByIdRoute(server, connection)

  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should return 200 if customer loaded', async () => {
    const createdCustomer = {
      id: 'valid_id',
      name: 'any_name',
      document: 12345678910
    }
    const key = `customer:${createdCustomer.id}`
    await connection.set(key, JSON.stringify(createdCustomer))

    const response = await request(server.express).get(`/customers/${createdCustomer.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(createdCustomer)
  })

  it('should return 404 if customer not found', async () => {
    const response = await request(server.express).get('/customers/invalid_id')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ error: 'Entity customer not found with id invalid_id' })
  })

  it('should return 502 if redis connection throws ConnectionNotEstablishedError', async () => {
    jest.spyOn(connection, 'get').mockRejectedValueOnce(new ConnectionNotEstablishedError())
    const createdCustomer = {
      id: 'valid_id',
      name: 'any_name',
      document: 12345678910
    }
    const key = `customer:${createdCustomer.id}`
    await connection.set(key, JSON.stringify(createdCustomer))

    const response = await request(server.express).get(`/customers/${createdCustomer.id}`)

    expect(response.status).toBe(502)
    expect(response.body).toEqual({
      error: 'Connection not established'
    })
  })
})
