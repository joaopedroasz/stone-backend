import { HttpController } from './controller'

export type UpdateCustomerHttpInputDTO = {
  existentCustomerId: string
  newId?: string
  newName?: string
  newDocument?: number
}

export type UpdateCustomerHttpOutputDTO = {
  id: string
  name: string
  document: number
}

export interface UpdateCustomerHttp extends HttpController<UpdateCustomerHttpInputDTO, UpdateCustomerHttpOutputDTO | Error> {}
