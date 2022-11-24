import request from 'supertest'

import { LoadCustomerByIdRoute, ServerHttpRestExpressAdapter } from '@/infra/http'
import { connection } from '@/tests/utils'

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
})
