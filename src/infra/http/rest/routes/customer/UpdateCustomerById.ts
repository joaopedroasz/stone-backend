import { UpdateCustomerByIdUseCase } from '@/application/UseCases'
import { DatabaseConnection, DeleteCustomerByIdRedisRepository, LoadCustomerByIdRedisRepository, UpdateCustomerByIdRedisRepository } from '@/infra/database'
import { UpdateCustomerByIdHttpController } from '@/infra/http/controllers'
import { ServerHttpRest } from '../../contracts'

export class UpdateCustomerByIdRoute {
  constructor (httpServer: ServerHttpRest, databaseConnection: DatabaseConnection) {
    const loadCustomerByIdRedisRepository = new LoadCustomerByIdRedisRepository(databaseConnection)
    const updateCustomerByIdRedisRepository = new UpdateCustomerByIdRedisRepository(databaseConnection)
    const deleteCustomerByIdRedisRepository = new DeleteCustomerByIdRedisRepository(databaseConnection)
    const updateCustomerByIdUseCase = new UpdateCustomerByIdUseCase(
      loadCustomerByIdRedisRepository,
      updateCustomerByIdRedisRepository,
      deleteCustomerByIdRedisRepository
    )
    const updateCustomerByIdHttpController = new UpdateCustomerByIdHttpController(updateCustomerByIdUseCase)
    httpServer.on('put', '/customers/:existentCustomerId', updateCustomerByIdHttpController)
  }
}
