import { UpdateCustomerById, UpdateCustomerByIdOutputDTO } from '@/application/contracts'
import {
  badRequest,
  MissingParamError,
  UpdateCustomerByIdHttp,
  UpdateCustomerHttpByIdController,
  UpdateCustomerByIdHttpInputDTO,
  success
} from '@/infra/http'

const makeHttpRequest = (props?: Partial<UpdateCustomerByIdHttpInputDTO>): UpdateCustomerByIdHttpInputDTO => ({
  existentCustomerId: 'existentCustomerId',
  newId: 'newId',
  newName: 'newName',
  newDocument: 12345678910,
  ...props
})

const makeUpdateCustomerById = (): UpdateCustomerById => ({
  execute: async (): Promise<UpdateCustomerByIdOutputDTO> => ({
    id: 'id',
    document: 12345678910,
    name: 'name'
  })
})

type SutType = {
  sut: UpdateCustomerByIdHttp
  updateCustomerById: UpdateCustomerById
}

const makeSut = (): SutType => {
  const updateCustomerById = makeUpdateCustomerById()
  const sut = new UpdateCustomerHttpByIdController(updateCustomerById)
  return {
    sut,
    updateCustomerById
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

  it('should call UpdateCustomerById with correct values', async () => {
    const { sut, updateCustomerById } = makeSut()
    const httpRequest = makeHttpRequest()
    const executeSpy = jest.spyOn(updateCustomerById, 'execute')

    await sut.handle(httpRequest)

    expect(executeSpy).toHaveBeenCalledWith({
      id: httpRequest.existentCustomerId,
      newCustomer: {
        id: httpRequest.newId,
        name: httpRequest.newName,
        document: httpRequest.newDocument
      }
    })
  })

  it('should return UpdateCustomerById result on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(success({
      id: 'id',
      document: 12345678910,
      name: 'name'
    }))
  })
})
