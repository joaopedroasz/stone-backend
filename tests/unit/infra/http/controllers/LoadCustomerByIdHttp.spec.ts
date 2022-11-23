import {
  badRequest,
  LoadCustomerByIdHttp,
  LoadCustomerByIdHttpController,
  LoadCustomerByIdHttpInputDTO,
  MissingParamError
} from '@/infra/http'

const makeHttpRequest = (props?: Partial<LoadCustomerByIdHttpInputDTO>): LoadCustomerByIdHttpInputDTO => ({
  customerId: 'any_id',
  ...props
})

type SutType = {
  sut: LoadCustomerByIdHttp
}

const makeSut = (): SutType => {
  const sut = new LoadCustomerByIdHttpController()
  return {
    sut
  }
}

describe('LoadCustomerByIdHttpController', () => {
  it('should return 400 if no customerId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({ customerId: undefined })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('customerId')))
  })
})
