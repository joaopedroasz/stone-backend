import request from 'supertest'

import { ServerHttpRestExpressAdapter, UpdateCustomerByIdRoute } from '@/infra/http'
import { connection } from '@/tests/utils'

describe('UpdateCustomerByIdRoute', () => {
  const server = new ServerHttpRestExpressAdapter()
  new UpdateCustomerByIdRoute(server, connection)

  beforeAll(async () => {
    await connection.connect()
    await connection.clear()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should return 200 is customer is updated', async () => {
    const createdCustomer = {
      id: 'existent_id',
      name: 'any_name',
      document: 12345678910
    }
    const key = `customer:${createdCustomer.id}`
    await connection.set(key, JSON.stringify(createdCustomer))

    const response = await request(server.express).put(`/customers/${createdCustomer.id}`).send({
      newId: 'new_customer_id',
      newName: 'new_name',
      newDocument: 98765432101
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 'new_customer_id',
      name: 'new_name',
      document: 98765432101
    })
  })

  it('should return 200 when update only id', async () => {
    const createdCustomer = {
      id: 'existentId',
      name: 'any_name',
      document: 12345678910
    }
    const key = `customer:${createdCustomer.id}`
    await connection.set(key, JSON.stringify(createdCustomer))

    const response = await request(server.express).put(`/customers/${createdCustomer.id}`).send({
      newId: 'new_customerId'
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 'new_customerId',
      name: 'any_name',
      document: 12345678910
    })
  })

  it('should return 200 when update only name', async () => {
    const createdCustomer = {
      id: 'existentCustomerId',
      name: 'any_name',
      document: 12345678910
    }
    const key = `customer:${createdCustomer.id}`
    await connection.set(key, JSON.stringify(createdCustomer))

    const response = await request(server.express).put(`/customers/${createdCustomer.id}`).send({
      newName: 'new_name'
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 'existentCustomerId',
      name: 'new_name',
      document: 12345678910
    })
  })
})
