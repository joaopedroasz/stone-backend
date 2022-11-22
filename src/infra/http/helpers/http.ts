import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const success = <T = Record<string, any>>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})

export const unknownError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  body: new Error(error)
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: error
})
