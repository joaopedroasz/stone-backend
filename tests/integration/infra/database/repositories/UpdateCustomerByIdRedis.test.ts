import { Customer, CustomerProps } from '@/domain/models'
import { UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection, UpdateCustomerByIdRedisRepository } from '@/infra/database'
import { connection } from '@/tests/utils'

const makeCustomer = (props?: Partial<CustomerProps>): Customer => new Customer({
  id: 'any_id',
  document: 100,
  name: 'any_name',
  ...props
})

type SutType = {
  sut: UpdateCustomerByIdRepository
  connection: DatabaseConnection
}

const makeSut = (): SutType => {
  const sut = new UpdateCustomerByIdRedisRepository(connection)

  return {
    sut,
    connection
  }
}

describe('UpdateCustomerByIdRedisRepository', () => {
  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should update a customer by Id', async () => {
    const { sut, connection } = makeSut()
    const createdCustomer = makeCustomer()
    const key = `customer:${createdCustomer.getId()}`
    const stringCreatedCustomer = JSON.stringify({
      id: createdCustomer.getId(),
      document: createdCustomer.getDocument(),
      name: createdCustomer.getName()
    })
    await connection.set(key, stringCreatedCustomer)

    const newCustomer = makeCustomer({
      name: 'updated_name',
      document: 300,
      id: 'new_id'
    })
    const updatedCustomer = await sut.update(createdCustomer.getId(), newCustomer)

    expect(updatedCustomer).toEqual(newCustomer)
  })
})
