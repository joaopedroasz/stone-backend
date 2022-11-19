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

  it('should return provided id', () => {
    const sut = makeSut()

    expect(sut.getId()).toBe('any_id')
  })

  it('should return provided document', () => {
    const sut = makeSut()

    expect(sut.getDocument()).toBe('any_document')
  })

  it('should return provided name', () => {
    const sut = makeSut()

    expect(sut.getName()).toBe('any_name')
  })
})
