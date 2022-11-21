import { Customer } from '@/domain/models'
import { CreateCustomerRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection } from '../../contracts'
import { CustomerNotCreatedError } from '../../errors'

export class CreateCustomerRedisRepository implements CreateCustomerRepository {
  constructor (
    private readonly connection: DatabaseConnection
  ) {}

  public async create (customer: Customer): Promise<Customer> {
    const key = `customer:${customer.getId()}`

    const success = await this.connection.set(key, JSON.stringify({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    }))

    if (!success) throw new CustomerNotCreatedError()

    return new Customer({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    })
  }
}
