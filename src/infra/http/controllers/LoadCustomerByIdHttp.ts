import { LoadCustomerById } from '@/application/contracts'
import { HttpResponse, LoadCustomerByIdHttp, LoadCustomerByIdHttpInputDTO, LoadCustomerByIdHttpOutputDTO } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class LoadCustomerByIdHttpController implements LoadCustomerByIdHttp {
  constructor (
    private readonly loadCustomerById: LoadCustomerById
  ) {}

  public async handle (request: LoadCustomerByIdHttpInputDTO): Promise<HttpResponse<LoadCustomerByIdHttpOutputDTO | Error>> {
    const error = this.validateRequest(request)
    if (error) return badRequest(error)

    const { customerId } = request
    await this.loadCustomerById.execute({ customerId })

    return {
      statusCode: 0,
      body: {
        id: 'any_id',
        document: 0,
        name: 'any_name'
      }
    }
  }

  private validateRequest (request: LoadCustomerByIdHttpInputDTO): MissingParamError | undefined {
    const { customerId } = request
    if (!customerId) return new MissingParamError('customerId')
  }
}
