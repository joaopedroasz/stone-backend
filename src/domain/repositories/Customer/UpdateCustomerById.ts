import { Customer } from '@/domain/models'

export interface UpdateCustomerByIdRepository {
  update: (id: string, customer: Customer) => Promise<Customer>
}
