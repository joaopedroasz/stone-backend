import { Customer, CustomerProps } from '@/domain/models'

const makeSut = (props?: Partial<CustomerProps>): Customer => new Customer({
  id: 'any_id',
  document: 'any_document',
  name: 'any_name',
  ...props
})

describe('Customer', () => {
  it('should be able to create a valid self instance', () => {
    const sut = makeSut()

    expect(sut).toBeTruthy()
    expect(sut).toBeInstanceOf(Customer)
  })

  it('should return provided if', () => {
    const sut = makeSut()

    expect(sut.getId()).toBe('any_id')
  })
})
