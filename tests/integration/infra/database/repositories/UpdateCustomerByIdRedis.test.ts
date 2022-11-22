import { Customer, CustomerProps } from '@/domain/models'
import { UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { CustomerNotUpdatedError, DatabaseConnection, UpdateCustomerByIdRedisRepository } from '@/infra/database'
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
    const { sut } = makeSut()

    const newCustomer = makeCustomer({
      name: 'updated_name',
      document: 300,
      id: 'new_id'
    })
    const updatedCustomer = await sut.update(newCustomer)

    expect(updatedCustomer).toEqual(newCustomer)
  })

  it('should throw CustomerNotUpdatedError if connection.set returns false', async () => {
    const { sut, connection } = makeSut()
    const newCustomer = makeCustomer({
      name: 'updated_name',
      document: 300,
      id: 'new_id'
    })
    jest.spyOn(connection, 'set').mockResolvedValueOnce(false)

    const promise = sut.update(newCustomer)

    await expect(promise).rejects.toThrowError(new CustomerNotUpdatedError())
  })
})
