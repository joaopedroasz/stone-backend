import { UpdateCustomerById, UpdateCustomerByIdInputDTO } from '@/application/contracts'
import { HttpResponse, UpdateCustomerByIdHttp, UpdateCustomerByIdHttpInputDTO, UpdateCustomerByIdHttpOutputDTO } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest, serverError, success, unknownError } from '../helpers'

export class UpdateCustomerByIdHttpController implements UpdateCustomerByIdHttp {
  constructor (
    private readonly updateCustomerById: UpdateCustomerById
  ) {}

  public async handle (request: UpdateCustomerByIdHttpInputDTO): Promise<HttpResponse<UpdateCustomerByIdHttpOutputDTO | Error>> {
    try {
      const errorInRequest = this.validateRequest(request)
      if (errorInRequest) return badRequest(errorInRequest)

      const { existentCustomerId, newId, newName, newDocument } = request
      const input: UpdateCustomerByIdInputDTO = {
        id: existentCustomerId,
        newCustomer: {
          id: newId,
          name: newName,
          document: newDocument
        }
      }
      const updatedCustomer = await this.updateCustomerById.execute(input)

      return success<UpdateCustomerByIdHttpOutputDTO>(updatedCustomer)
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return unknownError(error)

      return serverError(error)
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
