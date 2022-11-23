import { LoadCustomerById } from '@/application/contracts'
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

const makeLoadCustomerById = (): LoadCustomerById => ({
  execute: async () => ({
    id: 'any_id',
    document: 0,
    name: 'any_name'
  })
})

type SutType = {
  sut: LoadCustomerByIdHttp
  loadCustomerById: LoadCustomerById
}

const makeSut = (): SutType => {
  const loadCustomerById = makeLoadCustomerById()
  const sut = new LoadCustomerByIdHttpController(loadCustomerById)
  return {
    sut,
    loadCustomerById
  }
}

describe('LoadCustomerByIdHttpController', () => {
  it('should return 400 if no customerId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({ customerId: undefined })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('customerId')))
  })

  it('should call LoadCustomerById with correct values', async () => {
    const { sut, loadCustomerById } = makeSut()
    const httpRequest = makeHttpRequest()
    const handleSpy = jest.spyOn(loadCustomerById, 'execute')

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith({
      customerId: httpRequest.customerId
    })
  })
})
