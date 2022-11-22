import { CreateCustomer } from '@/application/contracts'
import {
  badRequest,
  CreateCustomerHttp,
  CreateCustomerHttpInputDTO,
  CreateCustomerHttpOutputDTO,
  HttpResponse,
  MissingParamError
} from '@/infra/http'

export class CreateCustomerHttpController implements CreateCustomerHttp {
  constructor (
    private readonly createCustomer: CreateCustomer
  ) {}

  public async handle (request: CreateCustomerHttpInputDTO): Promise<HttpResponse<CreateCustomerHttpOutputDTO | Error>> {
    const errorInRequest = this.validateRequest(request)
    if (errorInRequest) return badRequest(errorInRequest)

    await this.createCustomer.execute(request)

    return {
      statusCode: 0,
      body: {
        id: '',
        name: '',
        document: 0
      }
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
