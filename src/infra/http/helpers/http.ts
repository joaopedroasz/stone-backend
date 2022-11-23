import { HttpResponse } from '../contracts'
import { ErrorWithCode } from '../contracts/errors'

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

export const serverError = (error: ErrorWithCode): HttpResponse<Error> => ({
  statusCode: error.code ?? 500,
  body: error
})

export const badGateway = (error: Error): HttpResponse<Error> => ({
  statusCode: 502,
  body: error
})
