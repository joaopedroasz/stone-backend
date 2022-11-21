import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { LoadCustomerById, LoadCustomerByIdInputDTO, LoadCustomerByIdOutputDTO } from '../contracts'

export class LoadCustomerByIdUseCase implements LoadCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository
  ) {}

  public async execute (input: LoadCustomerByIdInputDTO): Promise<LoadCustomerByIdOutputDTO> {
    const { customerId } = input
    await this.loadCustomerByIdRepository.load(customerId)
    return {
      id: '',
      document: 0,
      name: ''
    }
  }
}
