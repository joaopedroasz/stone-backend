import { Customer } from '@/domain/models'

export interface UpdateCustomerByIdRepository {
  update: (customer: Customer) => Promise<Customer>
}
