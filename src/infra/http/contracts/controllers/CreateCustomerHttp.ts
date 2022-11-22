import { HttpController } from './controller'

export type CreateCustomerHttpInputDTO = {
  name: string
  document: number
}

export type CreateCustomerHttpOutputDTO = {
  id: string
  name: string
  document: number
}

export interface CreateCustomerHttp extends HttpController<CreateCustomerHttpInputDTO, CreateCustomerHttpOutputDTO | Error> {}
