import { Customer, CustomerProps } from '@/domain/models'
import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { UpdateCustomerById } from '@/application/contracts'
import { UpdateCustomerByIdUseCase } from '@/application/UseCases'

const makeCustomer = (props?: Partial<CustomerProps>): Customer => new Customer({
  id: 'any_id',
  document: 'any_document',
  name: 'any_name',
  ...props
})

const makeLoadCustomerByIdRepository = (): LoadCustomerByIdRepository => ({
  load: async (id: string): Promise<Customer> => makeCustomer({ id })
})

type SutType = {
  sut: UpdateCustomerById
  loadCustomerByIdRepository: LoadCustomerByIdRepository
}

const makeSut = (): SutType => {
  const loadCustomerByIdRepository = makeLoadCustomerByIdRepository()
  const sut = new UpdateCustomerByIdUseCase(loadCustomerByIdRepository)
  return {
    sut,
    loadCustomerByIdRepository
  }
}

describe('UpdateCustomerById UseCase', () => {
  it('should call LoadCustomerByIdRepository with correct params', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    const loadCustomerByIdRepositorySpy = jest.spyOn(loadCustomerByIdRepository, 'load')

    await sut.execute({
      id: 'any_id',
      document: 'any_document',
      name: 'any_name'
    })

    expect(loadCustomerByIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })
})
