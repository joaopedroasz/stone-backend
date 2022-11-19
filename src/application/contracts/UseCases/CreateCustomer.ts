import { UseCase } from './UseCase'

export type CreateCustomerInputDTO = {
  document: number
  name: string
}

export type CreateCustomerOutputDTO = {
  id: string
  document: number
  name: string
}

export interface CreateCustomer extends UseCase<CreateCustomerInputDTO, CreateCustomerOutputDTO> {}
