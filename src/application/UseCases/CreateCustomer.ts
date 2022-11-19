import { Customer } from '@/domain/models'
import { CreateCustomerRepository } from '@/domain/repositories/Customer'
import { CreateCustomer, CreateCustomerInputDTO, CreateCustomerOutputDTO, GenerateIdService } from '../contracts'

export class CreateCustomerUseCase implements CreateCustomer {
  constructor (
    private readonly createCustomerRepository: CreateCustomerRepository,
    private readonly generateIdService: GenerateIdService
  ) {}

  public async execute (input: CreateCustomerInputDTO): Promise<CreateCustomerOutputDTO> {
    const { document, name } = input
    const id = this.generateIdService.generate()
    const customer = new Customer({ document, name, id })
    const createdCustomer = await this.createCustomerRepository.create(customer)
    return {
      id: createdCustomer.getId(),
      document: createdCustomer.getDocument(),
      name: createdCustomer.getName()
    }
  }
}
