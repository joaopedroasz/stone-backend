import { Customer } from '@/domain/models'
import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection, LoadCustomerByIdRedisRepository } from '@/infra/database'
import { connection } from '@/tests/utils'

const makeCustomer = (): Customer => new Customer({
  id: 'any_id',
  document: 100,
  name: 'any_name'
})

type SutType = {
  sut: LoadCustomerByIdRepository
  connection: DatabaseConnection
}

const makeSut = (): SutType => ({
  sut: new LoadCustomerByIdRedisRepository(connection),
  connection
})

describe('LoadCustomerByIdRedisRepository', () => {
  beforeEach(async () => {
    const { connection } = makeSut()
    await connection.connect()
  })

  afterEach(async () => {
    const { connection } = makeSut()
    await connection.disconnect()
  })

  it('should load a customer by id', async () => {
    const { sut, connection } = makeSut()
    const customer = makeCustomer()
    const key = `customer:${customer.getId()}`
    const stringifiedCustomer = JSON.stringify({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    })
    await connection.set(key, stringifiedCustomer)

    const loadedCustomer = await sut.load(customer.getId())

    expect(loadedCustomer).toEqual(customer)
  })

  it('should return undefined if customer does not exist', async () => {
    const { sut } = makeSut()

    const loadedCustomer = await sut.load('any_invalid_id')

    expect(loadedCustomer).toBeUndefined()
  })
})
