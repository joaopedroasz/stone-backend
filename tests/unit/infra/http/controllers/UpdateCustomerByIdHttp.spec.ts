import {
  badRequest,
  MissingParamError,
  UpdateCustomerByIdHttp,
  UpdateCustomerHttpByIdController,
  UpdateCustomerByIdHttpInputDTO
} from '@/infra/http'

const makeHttpRequest = (props?: Partial<UpdateCustomerByIdHttpInputDTO>): UpdateCustomerByIdHttpInputDTO => ({
  existentCustomerId: 'existentCustomerId',
  newId: 'newId',
  newName: 'newName',
  newDocument: 12345678910,
  ...props
})

type SutType = {
  sut: UpdateCustomerByIdHttp
}

const makeSut = (): SutType => {
  const sut = new UpdateCustomerHttpByIdController()
  return {
    sut
  }
}

describe('UpdateCustomerHttpController', () => {
  it('should return badRequest if no existentCustomerId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      existentCustomerId: undefined
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('existentCustomerId')))
  })
})
