import { Customer } from '@/domain/models'
import { UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection } from '../../contracts'

export class UpdateCustomerByIdRedisRepository implements UpdateCustomerByIdRepository {
  constructor (private readonly connection: DatabaseConnection) {}

  public async update (id: string, customer: Customer): Promise<Customer> {
    const key = `customer:${id}`
    const stringCustomer = JSON.stringify({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    })
    await this.connection.set(key, stringCustomer)
    return customer
  }
}
