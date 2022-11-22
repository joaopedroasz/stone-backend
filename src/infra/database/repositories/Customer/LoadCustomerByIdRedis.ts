import { Customer } from '@/domain/models'
import { LoadCustomerByIdRepository } from '@/domain/repositories/Customer'
import { DatabaseConnection } from '../../contracts'

export class LoadCustomerByIdRedisRepository implements LoadCustomerByIdRepository {
  constructor (
    private readonly connection: DatabaseConnection
  ) {}

  public async load (id: string): Promise<Customer | undefined> {
    const key = `customer:${id}`
    const stringifiedCustomer = await this.connection.get(key)

    if (!stringifiedCustomer) return undefined

    const customer = JSON.parse(stringifiedCustomer)
    return new Customer({
      id: customer.id,
      document: customer.document,
      name: customer.name
    })
  }
}
