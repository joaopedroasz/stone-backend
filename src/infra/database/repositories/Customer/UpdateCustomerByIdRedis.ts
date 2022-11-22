import { Customer } from '@/domain/models'
import { UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection } from '../../contracts'
import { CustomerNotUpdatedError } from '../../errors'

export class UpdateCustomerByIdRedisRepository implements UpdateCustomerByIdRepository {
  constructor (private readonly connection: DatabaseConnection) {}

  public async update (customer: Customer): Promise<Customer> {
    const key = `customer:${customer.getId()}`

    const stringCustomer = JSON.stringify({
      id: customer.getId(),
      document: customer.getDocument(),
      name: customer.getName()
    })

    const success = await this.connection.set(key, stringCustomer)

    if (!success) throw new CustomerNotUpdatedError()

    return customer
  }
}
