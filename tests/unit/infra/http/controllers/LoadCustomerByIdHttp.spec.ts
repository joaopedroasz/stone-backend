import { LoadCustomerById } from '@/application/contracts'
import {
  badRequest,
  LoadCustomerByIdHttp,
  LoadCustomerByIdHttpController,
  LoadCustomerByIdHttpInputDTO,
  MissingParamError,
  serverError,
  success,
  unknownError
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

  it('should return LoadCustomerById result on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(success({
      id: 'any_id',
      document: 0,
      name: 'any_name'
    }))
  })

  it('should return return unknownError if use case throws non error instance', async () => {
    const { sut, loadCustomerById } = makeSut()
    const httpRequest = makeHttpRequest()
    jest.spyOn(loadCustomerById, 'execute').mockRejectedValueOnce('any_error')

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unknownError('any_error'))
  })

  it('should return return serverError if use case throws error instance', async () => {
    const { sut, loadCustomerById } = makeSut()
    const httpRequest = makeHttpRequest()
    jest.spyOn(loadCustomerById, 'execute').mockRejectedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
})
