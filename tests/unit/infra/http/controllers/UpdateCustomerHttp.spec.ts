import {
  badRequest,
  MissingParamError,
  UpdateCustomerHttp,
  UpdateCustomerHttpController,
  UpdateCustomerHttpInputDTO
} from '@/infra/http'

const makeHttpRequest = (props?: Partial<UpdateCustomerHttpInputDTO>): UpdateCustomerHttpInputDTO => ({
  existentCustomerId: 'existentCustomerId',
  newId: 'newId',
  newName: 'newName',
  newDocument: 12345678910,
  ...props
})

type SutType = {
  sut: UpdateCustomerHttp
}

const makeSut = (): SutType => {
  const sut = new UpdateCustomerHttpController()
  return {
    sut
  }
}

describe('UpdateCustomerHttpController', () => {
  it('should return 400 if no existentCustomerId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      existentCustomerId: undefined
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('existentCustomerId')))
  })
})
