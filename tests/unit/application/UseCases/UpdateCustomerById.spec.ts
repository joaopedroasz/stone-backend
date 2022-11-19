import { Customer, CustomerProps } from '@/domain/models'
import { LoadCustomerByIdRepository, UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { UpdateCustomerById } from '@/application/contracts'
import { UpdateCustomerByIdUseCase } from '@/application/UseCases'

const makeCustomer = (props?: Partial<CustomerProps>): Customer => new Customer({
  id: 'any_id',
  document: 200,
  name: 'any_name',
  ...props
})

const makeLoadCustomerByIdRepository = (): LoadCustomerByIdRepository => ({
  load: async (id: string): Promise<Customer> => makeCustomer({ id })
})

const makeUpdateCustomerByIdRepository = (): UpdateCustomerByIdRepository => ({
  update: async (customer: Customer): Promise<Customer> => makeCustomer({
    id: customer.getId(),
    document: customer.getDocument(),
    name: customer.getName()
  })
})

type SutType = {
  sut: UpdateCustomerById
  loadCustomerByIdRepository: LoadCustomerByIdRepository
  updateCustomerByIdRepository: UpdateCustomerByIdRepository
}

const makeSut = (): SutType => {
  const loadCustomerByIdRepository = makeLoadCustomerByIdRepository()
  const updateCustomerByIdRepository = makeUpdateCustomerByIdRepository()
  const sut = new UpdateCustomerByIdUseCase(loadCustomerByIdRepository)
  return {
    sut,
    loadCustomerByIdRepository,
    updateCustomerByIdRepository
  }
}

describe('UpdateCustomerById UseCase', () => {
  it('should call LoadCustomerByIdRepository with correct params', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    const loadCustomerByIdRepositorySpy = jest.spyOn(loadCustomerByIdRepository, 'load')

    await sut.execute({
      id: 'any_id',
      newCustomer: {
        document: 200,
        name: 'any_name'
      }
    })

    expect(loadCustomerByIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })
})
