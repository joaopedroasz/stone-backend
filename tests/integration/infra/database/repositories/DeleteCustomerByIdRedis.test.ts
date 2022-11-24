import { Customer } from '@/domain/models'
import { DeleteCustomerByIdRepository } from '@/domain/repositories/Customer'
import { CustomerNotDeletedError, DatabaseConnection, DeleteCustomerByIdRedisRepository } from '@/infra/database'
import { connection } from '@/tests/utils'

const makeCustomer = (): Customer => new Customer({
  id: 'any_id',
  document: 100,
  name: 'any_name'
})

type SutType = {
  sut: DeleteCustomerByIdRepository
  connection: DatabaseConnection
}

const makeSut = (): SutType => ({
  sut: new DeleteCustomerByIdRedisRepository(connection),
  connection
})

describe('DeleteCustomerByIdRedisRepository', () => {
  beforeAll(async () => {
    const { connection } = makeSut()
    await connection.connect()
  })

  afterAll(async () => {
    const { connection } = makeSut()
    await connection.disconnect()
  })

  it('should delete a customer by id', async () => {
    const { sut, connection } = makeSut()
    const customer = makeCustomer()
    const key = `customer:${customer.getId()}`
    const stringifiedCustomer = JSON.stringify({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    })
    await connection.set(key, stringifiedCustomer)

    await sut.delete(customer.getId())

    const deletedCustomer = await connection.get(key)

    expect(deletedCustomer).toBeUndefined()
  })

  it('should throw CustomerNotDeletedError if connection.delete returns false', async () => {
    const { sut, connection } = makeSut()
    const customer = makeCustomer()
    const key = `customer:${customer.getId()}`
    const stringifiedCustomer = JSON.stringify({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    })
    await connection.set(key, stringifiedCustomer)
    jest.spyOn(connection, 'delete').mockResolvedValueOnce(false)

    const promise = sut.delete(customer.getId())

    await expect(promise).rejects.toThrowError(new CustomerNotDeletedError())
  })
})
