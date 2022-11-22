import { DeleteCustomerByIdRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection } from '../../contracts'
import { CustomerNotDeletedError } from '../../errors'

export class DeleteCustomerByIdRedisRepository implements DeleteCustomerByIdRepository {
  constructor (private readonly connection: DatabaseConnection) {}

  async delete (id: string): Promise<void> {
    const key = `customer:${id}`
    const response = await this.connection.delete(key)
    if (!response) throw new CustomerNotDeletedError()
  }
}
