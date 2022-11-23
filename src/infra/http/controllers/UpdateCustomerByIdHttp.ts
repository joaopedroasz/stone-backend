import { HttpResponse, UpdateCustomerByIdHttp, UpdateCustomerByIdHttpInputDTO, UpdateCustomerByIdHttpOutputDTO } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class UpdateCustomerHttpByIdController implements UpdateCustomerByIdHttp {
  public async handle (request: UpdateCustomerByIdHttpInputDTO): Promise<HttpResponse<UpdateCustomerByIdHttpOutputDTO | Error>> {
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

  private validateRequest (request: UpdateCustomerByIdHttpInputDTO): MissingParamError | undefined {
    const requiredFields: ['existentCustomerId'] = ['existentCustomerId']
    for (const field of requiredFields) {
      const fieldExists = !!request[field]
      if (!fieldExists) return new MissingParamError(field)
    }
  }
}
