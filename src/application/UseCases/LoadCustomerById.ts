import { CustomerNotFoundError } from '@/domain/errors'
import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { LoadCustomerById, LoadCustomerByIdInputDTO, LoadCustomerByIdOutputDTO } from '../contracts'

export class LoadCustomerByIdUseCase implements LoadCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository
  ) {}

  public async execute (input: LoadCustomerByIdInputDTO): Promise<LoadCustomerByIdOutputDTO> {
    const { customerId } = input
    const loadedCustomer = await this.loadCustomerByIdRepository.load(customerId)
    if (!loadedCustomer) throw new CustomerNotFoundError({ targetProperty: 'id', targetValue: customerId })
    return {
      id: loadedCustomer.getId(),
      document: loadedCustomer.getDocument(),
      name: loadedCustomer.getName()
    }
  }
}
