import { Customer } from '@/domain/models'
import { CreateCustomerRepository } from '@/domain/repositories/Customer'
import { CreateCustomer } from '@/application/contracts'
import { CreateCustomerUseCase } from '@/application/UseCases'

const makeCustomer = (): Customer => new Customer({
  id: 'any_id',
  document: 'any_document',
  name: 'any_name'
})

const makeCreateCustomerRepository = (): CreateCustomerRepository => ({
  create: async (): Promise<Customer> => makeCustomer()
})

type SutType = {
  sut: CreateCustomer
  createCustomerRepository: CreateCustomerRepository
}

const makeSut = (): SutType => {
  const createCustomerRepository = makeCreateCustomerRepository()
  const sut = new CreateCustomerUseCase(createCustomerRepository)
  return {
    sut,
    createCustomerRepository
  }
}

describe('CreateCustomer', () => {
  it('should call CreateCustomerRepository with correct params', async () => {
    const { sut, createCustomerRepository } = makeSut()
    const createCustomerRepositorySpy = jest.spyOn(createCustomerRepository, 'create')

    await sut.execute({
      document: 'any_document',
      name: 'any_name'
    })

    expect(createCustomerRepositorySpy).toHaveBeenCalledWith(new Customer({
      document: 'any_document',
      name: 'any_name'
    }))
  })
})
