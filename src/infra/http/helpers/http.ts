import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const success = <T = Record<string, any>>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})
