import { CreateCustomer, CreateCustomerOutputDTO } from '@/application/contracts'
import {
  badRequest,
  CreateCustomerHttp,
  CreateCustomerHttpController,
  CreateCustomerHttpInputDTO,
  MissingParamError,
  success,
  unknownError
} from '@/infra/http'

const makeHttpRequest = (props?: Partial<CreateCustomerHttpInputDTO>): CreateCustomerHttpInputDTO => ({
  name: 'any_name',
  document: 10,
  ...props
})

const makeCreateCustomer = (): CreateCustomer => ({
  execute: async (): Promise<CreateCustomerOutputDTO> => ({
    id: 'any_id',
    document: 10,
    name: 'any_name'
  })
})

type SutType = {
  sut: CreateCustomerHttp
  createCustomer: CreateCustomer
}

const makeSut = (): SutType => {
  const createCustomer = makeCreateCustomer()
  const sut = new CreateCustomerHttpController(createCustomer)
  return {
    sut,
    createCustomer
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

  it('should return badRequest if no name provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest({
      name: undefined
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  it('should call CreateCustomer use case with correct values', async () => {
    const { sut, createCustomer } = makeSut()
    const httpRequest = makeHttpRequest()
    const createCustomerSpy = jest.spyOn(createCustomer, 'execute')

    await sut.handle(httpRequest)

    expect(createCustomerSpy).toHaveBeenCalledWith({
      name: httpRequest.name,
      document: httpRequest.document
    })
  })

  it('should return Created if CreateCustomer use case result on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(success({
      id: 'any_id',
      document: 10,
      name: 'any_name'
    }))
  })

  it('should return unknownError if use case throws non error instance', async () => {
    const { sut, createCustomer } = makeSut()
    const httpRequest = makeHttpRequest()
    jest.spyOn(createCustomer, 'execute').mockRejectedValueOnce('any_error')

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unknownError('any_error'))
  })
})
