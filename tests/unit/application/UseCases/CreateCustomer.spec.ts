import { Customer } from '@/domain/models'
import { CreateCustomerRepository } from '@/domain/repositories/Customer'
import { CreateCustomer, GenerateIdService } from '@/application/contracts'
import { CreateCustomerUseCase } from '@/application/UseCases'

const makeCustomer = (): Customer => new Customer({
  id: 'any_id',
  document: 'any_document',
  name: 'any_name'
})

const makeCreateCustomerRepository = (): CreateCustomerRepository => ({
  create: async (): Promise<Customer> => makeCustomer()
})

const makeGenerateIdService = (): GenerateIdService => ({
  generate: (): string => 'any_id'
})

type SutType = {
  sut: CreateCustomer
  createCustomerRepository: CreateCustomerRepository
  generateIdService: GenerateIdService
}

const makeSut = (): SutType => {
  const createCustomerRepository = makeCreateCustomerRepository()
  const generateIdService = makeGenerateIdService()
  const sut = new CreateCustomerUseCase(createCustomerRepository, generateIdService)
  return {
    sut,
    createCustomerRepository,
    generateIdService
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
      id: expect.any(String),
      document: 'any_document',
      name: 'any_name'
    }))
  })

  it('should call GenerateIdService with correct params', async () => {
    const { sut, generateIdService } = makeSut()
    const generateIdServiceSpy = jest.spyOn(generateIdService, 'generate')

    await sut.execute({
      document: 'any_document',
      name: 'any_name'
    })

    expect(generateIdServiceSpy).toHaveBeenCalledTimes(1)
  })

  it('should return CreateCustomerRepository result on success', async () => {
    const { sut, createCustomerRepository } = makeSut()
    jest.spyOn(createCustomerRepository, 'create').mockResolvedValueOnce(new Customer({
      id: 'id',
      document: 'document',
      name: 'name'
    }))

    const result = await sut.execute({
      document: 'any_document',
      name: 'any_name'
    })

    expect(result).toEqual({
      id: 'id',
      document: 'document',
      name: 'name'
    })
  })
})
