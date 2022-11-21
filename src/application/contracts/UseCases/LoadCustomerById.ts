import { UseCase } from './UseCase'

export type LoadCustomerByIdInputDTO = {
  customerId: string
}

export type LoadCustomerByIdOutputDTO = {
  id: string
  document: number
  name: string
}

export interface LoadCustomerById extends UseCase<LoadCustomerByIdInputDTO, LoadCustomerByIdOutputDTO> {}
