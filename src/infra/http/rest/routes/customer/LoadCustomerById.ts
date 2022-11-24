import { LoadCustomerByIdUseCase } from '@/application/UseCases'
import { DatabaseConnection, LoadCustomerByIdRedisRepository } from '@/infra/database'
import { LoadCustomerByIdHttpController } from '@/infra/http'
import { ServerHttpRest } from '../../contracts'

export class LoadCustomerByIdRoute {
  constructor (httpServer: ServerHttpRest, databaseConnection: DatabaseConnection) {
    const loadCustomerByIdRedisRepository = new LoadCustomerByIdRedisRepository(databaseConnection)
    const loadCustomerByIdUseCase = new LoadCustomerByIdUseCase(loadCustomerByIdRedisRepository)
    const loadCustomerByIdHttpController = new LoadCustomerByIdHttpController(loadCustomerByIdUseCase)
    httpServer.on('get', '/customers/:customerId', loadCustomerByIdHttpController)
  }
}
