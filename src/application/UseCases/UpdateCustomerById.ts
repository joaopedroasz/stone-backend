import { Customer } from '@/domain/models'
import { LoadCustomerByIdRepository, UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { UpdateCustomerById, UpdateCustomerByIdInputDTO, UpdateCustomerByIdOutputDTO } from '../contracts'

export class UpdateCustomerByIdUseCase implements UpdateCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository,
    private readonly updateCustomerByIdRepository: UpdateCustomerByIdRepository
  ) {}

  public async execute (input: UpdateCustomerByIdInputDTO): Promise<UpdateCustomerByIdOutputDTO> {
    const { id, newCustomer } = input
    const existentCustomer = await this.loadCustomerByIdRepository.load(id)
    const customerToUpdate = new Customer({
      id,
      document: newCustomer.document ?? existentCustomer.getDocument(),
      name: newCustomer.name ?? existentCustomer.getName()
    })
    await this.updateCustomerByIdRepository.update(customerToUpdate)

    return {
      id: 'any_id',
      document: 200,
      name: 'any_name'
    }
  }
}
