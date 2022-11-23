import { HttpResponse, UpdateCustomerHttp, UpdateCustomerHttpInputDTO, UpdateCustomerHttpOutputDTO } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class UpdateCustomerHttpController implements UpdateCustomerHttp {
  public async handle (request: UpdateCustomerHttpInputDTO): Promise<HttpResponse<UpdateCustomerHttpOutputDTO | Error>> {
    const errorInRequest = this.validateRequest(request)
    if (errorInRequest) return badRequest(errorInRequest)

    return {
      statusCode: 0,
      body: {
        id: '',
        document: 0,
        name: ''
      }
    }
  }

  private validateRequest (request: UpdateCustomerHttpInputDTO): MissingParamError | undefined {
    const requiredFields: ['existentCustomerId'] = ['existentCustomerId']
    for (const field of requiredFields) {
      const fieldExists = !!request[field]
      if (!fieldExists) return new MissingParamError(field)
    }
  }
}
