import { UseCase } from './UseCase'

type Default = {
  id: string
  document: string
  name: string
}

export type UpdateCustomerByIdInputDTO = Default

export type UpdateCustomerByIdOutputDTO = Default

export interface UpdateCustomerById extends UseCase<UpdateCustomerByIdInputDTO, UpdateCustomerByIdOutputDTO> {}
