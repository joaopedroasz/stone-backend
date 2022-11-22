import { Customer } from '@/domain/models'
import { CustomerAlreadyExistsError, CustomerNotFoundError } from '@/domain/errors'
import { DeleteCustomerByIdRepository, LoadCustomerByIdRepository, UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { UpdateCustomerById, UpdateCustomerByIdInputDTO, UpdateCustomerByIdOutputDTO } from '../contracts'

export class UpdateCustomerByIdUseCase implements UpdateCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository,
    private readonly updateCustomerByIdRepository: UpdateCustomerByIdRepository,
    private readonly deleteCustomerByIdRepository: DeleteCustomerByIdRepository
  ) {}

  public async execute (input: UpdateCustomerByIdInputDTO): Promise<UpdateCustomerByIdOutputDTO> {
    const { id, newCustomer } = input
    if (newCustomer.id) {
      const customerWithNewId = await this.loadCustomerByIdRepository.load(newCustomer.id)
      if (customerWithNewId) throw new CustomerAlreadyExistsError({ targetProperty: 'id', targetValue: newCustomer.id })
    }

    const existentCustomer = await this.loadCustomerByIdRepository.load(id)
    if (!existentCustomer) throw new CustomerNotFoundError({ targetProperty: 'id', targetValue: id })
    const customerToUpdate = new Customer({
      id: newCustomer.id ?? existentCustomer.getId(),
      document: newCustomer.document ?? existentCustomer.getDocument(),
      name: newCustomer.name ?? existentCustomer.getName()
    })

    const updatedCustomer = await this.updateCustomerByIdRepository.update(customerToUpdate)

    if (id !== updatedCustomer.getId()) {
      await this.deleteCustomerByIdRepository.delete(id)
    }

    return {
      id: updatedCustomer.getId(),
      document: updatedCustomer.getDocument(),
      name: updatedCustomer.getName()
    }
  }
}
