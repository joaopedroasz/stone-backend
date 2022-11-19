import { CustomerCode, CustomerCodeProps } from '@/domain/models'

const makeSut = (props?: Partial<CustomerCodeProps>): CustomerCode => new CustomerCode({ value: 'any_value', ...props })

describe('CustomerCode', () => {
  it('should return provided code', () => {
    const sut = makeSut()

    expect(sut.getCode()).toBe('any_value')
  })
})
