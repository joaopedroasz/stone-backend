import { LoadCustomerById } from '@/application/contracts'
import { HttpResponse, LoadCustomerByIdHttp, LoadCustomerByIdHttpInputDTO, LoadCustomerByIdHttpOutputDTO } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest, serverError, success, unknownError } from '../helpers'

export class LoadCustomerByIdHttpController implements LoadCustomerByIdHttp {
  constructor (
    private readonly loadCustomerById: LoadCustomerById
  ) {}

  public async handle (request: LoadCustomerByIdHttpInputDTO): Promise<HttpResponse<LoadCustomerByIdHttpOutputDTO | Error>> {
    try {
      const error = this.validateRequest(request)
      if (error) return badRequest(error)

      const { customerId } = request
      const loadedCustomer = await this.loadCustomerById.execute({ customerId })

      return success<LoadCustomerByIdHttpOutputDTO>(loadedCustomer)
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return unknownError(error)

      return serverError(error)
    }
  }

  private validateRequest (request: LoadCustomerByIdHttpInputDTO): MissingParamError | undefined {
    const { customerId } = request
    if (!customerId) return new MissingParamError('customerId')
  }
}
