import crypto from 'node:crypto'

import { GenerateIdService } from '@/application/contracts'
import { GenerateIdCriptoUuidService } from '@/infra/services'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn()
}))

type SutType = {
  sut: GenerateIdService
}

const makeSut = (): SutType => {
  const sut = new GenerateIdCriptoUuidService()

  return {
    sut
  }
}

describe('GenerateIdCriptoUuidService', () => {
  let randomUUIDSpy: jest.Mock

  beforeEach(() => {
    randomUUIDSpy = jest.fn().mockReturnValue('any_id')
    jest.mocked(crypto).randomUUID.mockImplementation(randomUUIDSpy)
  })

  it('should call randomUUID', () => {
    const { sut } = makeSut()

    sut.generate()

    expect(randomUUIDSpy).toHaveBeenCalled()
  })
})
