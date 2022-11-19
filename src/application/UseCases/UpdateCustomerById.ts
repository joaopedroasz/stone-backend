import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { UpdateCustomerById, UpdateCustomerByIdInputDTO, UpdateCustomerByIdOutputDTO } from '../contracts'

export class UpdateCustomerByIdUseCase implements UpdateCustomerById {
  constructor (
    private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository
  ) {}

  public async execute (input: UpdateCustomerByIdInputDTO): Promise<UpdateCustomerByIdOutputDTO> {
    const { id } = input
    await this.loadCustomerByIdRepository.load(id)

    return {
      id: 'any_id',
      document: 'any_document',
      name: 'any_name'
    }
  }
}
