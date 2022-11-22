import {
  badRequest,
  CreateCustomerHttp,
  CreateCustomerHttpController,
  CreateCustomerHttpInputDTO,
  MissingParamError
} from '@/infra/http'

const makeHttpRequest = (props?: Partial<CreateCustomerHttpInputDTO>): CreateCustomerHttpInputDTO => ({
  name: 'any_name',
  document: 10,
  ...props
})

type SutType = {
  sut: CreateCustomerHttp
}

const makeSut = (): SutType => {
  const sut = new CreateCustomerHttpController()
  return {
    sut
  }
}

describe('CreateCustomerHttpController', () => {
  it('should return badRequest if no document provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      document: undefined
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('document')))
  })
})
