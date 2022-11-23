import { HttpController } from './controller'

export type UpdateCustomerByIdHttpInputDTO = {
  existentCustomerId: string
  newId?: string
  newName?: string
  newDocument?: number
}

export type UpdateCustomerByIdHttpOutputDTO = {
  id: string
  name: string
  document: number
}

export interface UpdateCustomerByIdHttp extends HttpController<UpdateCustomerByIdHttpInputDTO, UpdateCustomerByIdHttpOutputDTO | Error> {}
