import { UseCase } from './UseCase'

type Default = {
  id: string
  document: number
  name: string
}

export type UpdateCustomerByIdInputDTO = {
  id: string
  newCustomer: Partial<Default>
}

export type UpdateCustomerByIdOutputDTO = Default & {
  id: string
}

export interface UpdateCustomerById extends UseCase<UpdateCustomerByIdInputDTO, UpdateCustomerByIdOutputDTO> {}
