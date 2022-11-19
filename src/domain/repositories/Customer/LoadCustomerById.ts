import { Customer } from '@/domain/models'

export interface LoadCustomerByIdRepository {
  load: (id: string) => Promise<Customer>
}
