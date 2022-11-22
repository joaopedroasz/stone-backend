import { CreateCustomer } from '@/application/contracts'
import { CustomerNotCreatedError } from '@/infra/database'
import {
  badGateway,
  badRequest,
  CreateCustomerHttp,
  CreateCustomerHttpInputDTO,
  CreateCustomerHttpOutputDTO,
  HttpResponse,
  MissingParamError,
  serverError,
  success,
  unknownError
} from '@/infra/http'

export class CreateCustomerHttpController implements CreateCustomerHttp {
  constructor (
    private readonly createCustomer: CreateCustomer
  ) {}

  public async handle (request: CreateCustomerHttpInputDTO): Promise<HttpResponse<CreateCustomerHttpOutputDTO | Error>> {
    try {
      const errorInRequest = this.validateRequest(request)
      if (errorInRequest) return badRequest(errorInRequest)

      const createdCustomer = await this.createCustomer.execute(request)

      return success<CreateCustomerHttpOutputDTO>(createdCustomer)
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return unknownError(error)

      const badGatewayErrors = [
        CustomerNotCreatedError
      ]

      for (const badGatewayError of badGatewayErrors) {
        if (error instanceof badGatewayError) return badGateway(error)
      }

      return serverError(error)
    }
  }

  private validateRequest (request: CreateCustomerHttpInputDTO): MissingParamError | undefined {
    const requiredFields: ['document', 'name'] = ['document', 'name']
    for (const field of requiredFields) {
      const fieldExists = !!request[field]
      if (!fieldExists) return new MissingParamError(field)
    }
  }
}
