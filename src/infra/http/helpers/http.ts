import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})
