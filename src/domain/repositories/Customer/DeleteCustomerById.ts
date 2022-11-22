export interface DeleteCustomerByIdRepository {
  delete: (id: string) => Promise<void>
}
