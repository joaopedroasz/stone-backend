import { UseCase } from './UseCase'

export type CreateCustomerInputDTO = {
  document: string
  name: string
}

export type CreateCustomerOutputDTO = {
  id: string
  document: string
  name: string
}

export interface CreateCustomer extends UseCase<CreateCustomerInputDTO, CreateCustomerOutputDTO> {}
