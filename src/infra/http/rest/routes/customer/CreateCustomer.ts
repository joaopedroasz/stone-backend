import { CreateCustomerUseCase } from '@/application/UseCases'
import { CreateCustomerRedisRepository, DatabaseConnection } from '@/infra/database'
import { CreateCustomerHttpController } from '@/infra/http/controllers'
import { GenerateIdCriptoUuidService } from '@/infra/services'
import { ServerHttpRest } from '../../contracts'

export class CreateCustomerRoute {
  constructor (httpServer: ServerHttpRest, databaseConnection: DatabaseConnection) {
    const createCustomerRedisRepository = new CreateCustomerRedisRepository(databaseConnection)
    const generateIdCriptoUuidService = new GenerateIdCriptoUuidService()
    const createCustomerUseCase = new CreateCustomerUseCase(
      createCustomerRedisRepository,
      generateIdCriptoUuidService
    )
    const createCustomerHttpCustomer = new CreateCustomerHttpController(createCustomerUseCase)
    httpServer.on('post', '/customers', createCustomerHttpCustomer)
  }
}
