import { Customer } from '@/domain/models'
import { CreateCustomerRepository } from '@/domain/repositories/Customer'
import { CreateCustomer, CreateCustomerInputDTO, CreateCustomerOutputDTO } from '../contracts'

export class CreateCustomerUseCase implements CreateCustomer {
  constructor (
    private readonly createCustomerRepository: CreateCustomerRepository
  ) {}

  public async execute (input: CreateCustomerInputDTO): Promise<CreateCustomerOutputDTO> {
    const { document, name } = input
    const customer = new Customer({ document, name })
    await this.createCustomerRepository.create(customer)
    return {
      id: 'any_id',
      document: 'any_document',
      name: 'any_name'
    }
  }
}
