import request from 'supertest'

import { CreateCustomerRoute, ServerHttpRestExpressAdapter } from '@/infra/http'
import { ConnectionNotEstablishedError } from '@/infra/database'
import { connection } from '@/tests/utils'

describe('CreateCustomerRoute', () => {
  const server = new ServerHttpRestExpressAdapter()
  new CreateCustomerRoute(server, connection)

  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should return 201 if customer is created', async () => {
    const response = await request(server.express)
      .post('/customers')
      .send({
        document: 100,
        name: 'any_name'
      })

    expect(response.status).toBe(201)
  })

  it('should return 400 if no name is provided', async () => {
    const input = {
      name: '',
      document: 12345678910
    }

    const response = await request(server.express).post('/customers').send(input)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Missing param: name'
    })
  })

  it('should return 400 if no document is provided', async () => {
    const input = {
      name: 'any_name',
      document: ''
    }

    const response = await request(server.express).post('/customers').send(input)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Missing param: document'
    })
  })

  it('should return 502 if redis connection throws ConnectionNotEstablishedError', async () => {
    jest.spyOn(connection, 'set').mockRejectedValueOnce(new ConnectionNotEstablishedError())
    const input = {
      name: 'any_name',
      document: 12345678910
    }

    const response = await request(server.express).post('/customers').send(input)

    expect(response.status).toBe(502)
    expect(response.body).toEqual({
      error: 'Connection not established'
    })
  })
})
