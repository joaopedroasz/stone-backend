import { Customer } from '@/domain/models'
import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { LoadCustomerById } from '@/application/contracts'
import { LoadCustomerByIdUseCase } from '@/application/UseCases'
import { CustomerNotFoundError } from '@/domain/errors'

const makeCustomer = (): Customer => new Customer({
  id: 'any_id',
  document: 100,
  name: 'any_name'
})

const makeLoadCustomerByIdRepository = (): LoadCustomerByIdRepository => ({
  load: async (): Promise<Customer> => makeCustomer()
})

type SutType = {
  sut: LoadCustomerById
  loadCustomerByIdRepository: LoadCustomerByIdRepository
}

const makeSut = (): SutType => {
  const loadCustomerByIdRepository = makeLoadCustomerByIdRepository()
  const sut = new LoadCustomerByIdUseCase(loadCustomerByIdRepository)
  return {
    sut,
    loadCustomerByIdRepository
  }
}

describe('LoadCustomerById Use Case', () => {
  it('should call LoadCustomerByIdRepository with correct id', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCustomerByIdRepository, 'load')

    await sut.execute({ customerId: 'any_id' })

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw CustomerNotFoundError if LoadCustomerByIdRepository returns undefined', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    const promise = sut.execute({ customerId: 'any_invalid_id' })

    await expect(promise).rejects.toThrowError(new CustomerNotFoundError({ targetProperty: 'id', targetValue: 'any_invalid_id' }))
  })

  it('should return a Customer on success', async () => {
    const { sut } = makeSut()

    const customer = await sut.execute({ customerId: 'any_id' })

    expect(customer).toEqual({
      id: 'any_id',
      document: 100,
      name: 'any_name'
    })
  })
})
