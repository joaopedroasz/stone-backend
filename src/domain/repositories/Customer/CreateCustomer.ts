import { Customer } from '@/domain/models'

export interface CreateCustomerRepository {
  create: (customer: Customer) => Promise<Customer>
}
