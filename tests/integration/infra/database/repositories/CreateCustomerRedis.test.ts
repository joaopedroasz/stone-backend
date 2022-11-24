import { Customer } from '@/domain/models'
import { CreateCustomerRepository } from '@/domain/repositories/Customer'
import { CreateCustomerRedisRepository, CustomerNotCreatedError, DatabaseConnection } from '@/infra/database'
import { connection } from '@/tests/utils'

const makeCustomer = (): Customer => new Customer({
  id: 'any_id',
  document: 100,
  name: 'any_name'
})

type SutType = {
  sut: CreateCustomerRepository
  connection: DatabaseConnection
}

const makeSut = (): SutType => {
  const sut = new CreateCustomerRedisRepository(connection)

  return {
    sut,
    connection
  }
}

describe('CreateCustomerRedisRepository', () => {
  beforeAll(async () => {
    const { connection } = makeSut()
    await connection.connect()
  })

  afterAll(async () => {
    const { connection } = makeSut()
    await connection.disconnect()
  })

  it('should create a new customer', async () => {
    const { sut } = makeSut()
    const customer = makeCustomer()

    const createdCustomer = await sut.create(makeCustomer())

    expect(createdCustomer).toEqual(new Customer({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    }))
  })

  it('should throw CustomerNotCreatedError if connection not return true', async () => {
    const { sut, connection } = makeSut()
    const customer = makeCustomer()
    jest.spyOn(connection, 'set').mockResolvedValueOnce(false)

    const error = sut.create(customer)

    await expect(error).rejects.toThrowError(new CustomerNotCreatedError())
  })
})
