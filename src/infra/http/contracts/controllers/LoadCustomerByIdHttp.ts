import { HttpController } from './Controller'

export type LoadCustomerByIdHttpInputDTO = {
  customerId: string
}

export type LoadCustomerByIdHttpOutputDTO = {
  id: string
  name: string
  document: number
}

export interface LoadCustomerByIdHttp extends HttpController<LoadCustomerByIdHttpInputDTO, LoadCustomerByIdHttpOutputDTO | Error> {}
