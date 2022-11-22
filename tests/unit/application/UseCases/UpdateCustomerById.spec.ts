import { Customer, CustomerProps } from '@/domain/models'
import { CustomerAlreadyExistsError, CustomerNotFoundError } from '@/domain/errors'
import { DeleteCustomerByIdRepository, LoadCustomerByIdRepository, UpdateCustomerByIdRepository } from '@/domain/repositories/Customer'
import { UpdateCustomerById } from '@/application/contracts'
import { UpdateCustomerByIdUseCase } from '@/application/UseCases'

const makeCustomer = (props?: Partial<CustomerProps>): Customer => new Customer({
  id: 'any_id',
  document: 200,
  name: 'any_name',
  ...props
})

const makeLoadCustomerByIdRepository = (): LoadCustomerByIdRepository => ({
  load: async (id: string): Promise<Customer> => makeCustomer({ id })
})

const makeUpdateCustomerByIdRepository = (): UpdateCustomerByIdRepository => ({
  update: async (customer: Customer): Promise<Customer> => makeCustomer({
    id: customer.getId(),
    document: customer.getDocument(),
    name: customer.getName()
  })
})

const makeDeleteCustomerByIdRepository = (): DeleteCustomerByIdRepository => ({
  delete: async (id: string): Promise<void> => {}
})

type SutType = {
  sut: UpdateCustomerById
  loadCustomerByIdRepository: LoadCustomerByIdRepository
  updateCustomerByIdRepository: UpdateCustomerByIdRepository
  deleteCustomerByIdRepository: DeleteCustomerByIdRepository
}

const makeSut = (): SutType => {
  const loadCustomerByIdRepository = makeLoadCustomerByIdRepository()
  const updateCustomerByIdRepository = makeUpdateCustomerByIdRepository()
  const deleteCustomerByIdRepository = makeDeleteCustomerByIdRepository()
  const sut = new UpdateCustomerByIdUseCase(
    loadCustomerByIdRepository,
    updateCustomerByIdRepository,
    deleteCustomerByIdRepository
  )
  return {
    sut,
    loadCustomerByIdRepository,
    updateCustomerByIdRepository,
    deleteCustomerByIdRepository
  }
}

describe('UpdateCustomerById UseCase', () => {
  it('should call LoadCustomerByIdRepository with correct params', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    const loadCustomerByIdRepositorySpy = jest.spyOn(loadCustomerByIdRepository, 'load')

    await sut.execute({
      id: 'any_id',
      newCustomer: {
        document: 200,
        name: 'any_name'
      }
    })

    expect(loadCustomerByIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })

  it('should call UpdateCustomerByIdRepository with existent customer id if it not provided', async () => {
    const { sut, updateCustomerByIdRepository } = makeSut()
    const updateCustomerByIdRepositorySpy = jest.spyOn(updateCustomerByIdRepository, 'update')

    await sut.execute({
      id: 'existent_customer_id',
      newCustomer: {
        document: 200,
        name: 'any_name'
      }
    })

    expect(updateCustomerByIdRepositorySpy).toHaveBeenCalledWith(makeCustomer({
      id: 'existent_customer_id',
      document: 200,
      name: 'any_name'
    }))
  })

  it('should call UpdateCustomerByIdRepository with existent customer name if not provided', async () => {
    const { sut, updateCustomerByIdRepository, loadCustomerByIdRepository } = makeSut()
    const updateCustomerByIdRepositorySpy = jest.spyOn(updateCustomerByIdRepository, 'update')
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    await sut.execute({
      id: 'existent_customer_id',
      newCustomer: {
        id: 'any_new_id',
        document: 400
      }
    })

    expect(updateCustomerByIdRepositorySpy).toHaveBeenCalledWith(new Customer({
      id: 'any_new_id',
      document: 400,
      name: 'any_name'
    }))
  })

  it('should call UpdateCustomerByIdRepository with existent customer document if not provided', async () => {
    const { sut, updateCustomerByIdRepository, loadCustomerByIdRepository } = makeSut()
    const updateCustomerByIdRepositorySpy = jest.spyOn(updateCustomerByIdRepository, 'update')
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    await sut.execute({
      id: 'existent_customer_id',
      newCustomer: {
        id: 'any_new_id',
        name: 'any_name'
      }
    })

    expect(updateCustomerByIdRepositorySpy).toHaveBeenCalledWith(new Customer({
      id: 'any_new_id',
      document: 200,
      name: 'any_name'
    }))
  })

  it('should call UpdateCustomerByIdRepository with new customer if provided', async () => {
    const { sut, updateCustomerByIdRepository, loadCustomerByIdRepository } = makeSut()
    const updateCustomerByIdRepositorySpy = jest.spyOn(updateCustomerByIdRepository, 'update')
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    await sut.execute({
      id: 'existent_customer_id',
      newCustomer: {
        id: 'new_id',
        document: 1000,
        name: 'new_name'
      }
    })

    expect(updateCustomerByIdRepositorySpy).toHaveBeenCalledWith(new Customer({
      id: 'new_id',
      document: 1000,
      name: 'new_name'
    }))
  })

  it('should throw CustomerNotFoundError if LoadCustomerByIdRepository returns undefined', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    const promise = sut.execute({
      id: 'any_id',
      newCustomer: {
        document: 200,
        name: 'any_name'
      }
    })

    await expect(promise).rejects.toThrowError(new CustomerNotFoundError({
      targetProperty: 'id',
      targetValue: 'any_id'
    }))
  })

  it('should call LoadCustomerByIdRepository if new id provided', async () => {
    const { sut, loadCustomerByIdRepository } = makeSut()
    const loadCustomerByIdRepositorySpy = jest.spyOn(loadCustomerByIdRepository, 'load')
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    await sut.execute({
      id: 'any_id',
      newCustomer: {
        id: 'new_id',
        document: 200,
        name: 'any_name'
      }
    })

    expect(loadCustomerByIdRepositorySpy).toHaveBeenCalledWith('new_id')
  })

  it('should throw CustomerAlreadyExistsError if LoadCustomerByIdRepository returns a customer with new id provided', async () => {
    const { sut } = makeSut()

    const promise = sut.execute({
      id: 'any_id',
      newCustomer: {
        id: 'new_id',
        document: 200,
        name: 'any_name'
      }
    })

    await expect(promise).rejects.toThrowError(new CustomerAlreadyExistsError({
      targetProperty: 'id',
      targetValue: 'new_id'
    }))
  })

  it('should return updated customer by UpdateCustomerByIdRepository', async () => {
    const { sut } = makeSut()

    const updatedCustomer = await sut.execute({
      id: 'any_id',
      newCustomer: {
        document: 700,
        name: 'new_name'
      }
    })

    expect(updatedCustomer).toEqual({
      id: 'any_id',
      document: 700,
      name: 'new_name'
    })
  })

  it('should call DeleteCustomerByIdRepository with customer old id if new id provided', async () => {
    const { sut, deleteCustomerByIdRepository, loadCustomerByIdRepository } = makeSut()
    const deleteCustomerByIdRepositorySpy = jest.spyOn(deleteCustomerByIdRepository, 'delete')
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    await sut.execute({
      id: 'old_id',
      newCustomer: {
        id: 'new_id',
        document: 200,
        name: 'any_name'
      }
    })

    expect(deleteCustomerByIdRepositorySpy).toHaveBeenCalledWith('old_id')
  })

  it('should not call DeleteCustomerByIdRepository if new id not provided', async () => {
    const { sut, deleteCustomerByIdRepository } = makeSut()
    const deleteCustomerByIdRepositorySpy = jest.spyOn(deleteCustomerByIdRepository, 'delete')

    await sut.execute({
      id: 'any_id',
      newCustomer: {
        document: 200,
        name: 'any_name'
      }
    })

    expect(deleteCustomerByIdRepositorySpy).not.toHaveBeenCalled()
  })

  it('should not call DeleteCustomerByIdRepository if new id is the same as old id', async () => {
    const { sut, deleteCustomerByIdRepository, loadCustomerByIdRepository } = makeSut()
    const deleteCustomerByIdRepositorySpy = jest.spyOn(deleteCustomerByIdRepository, 'delete')
    jest.spyOn(loadCustomerByIdRepository, 'load').mockResolvedValueOnce(undefined)

    await sut.execute({
      id: 'any_id',
      newCustomer: {
        id: 'any_id',
        document: 200,
        name: 'any_name'
      }
    })

    expect(deleteCustomerByIdRepositorySpy).not.toHaveBeenCalled()
  })
})
