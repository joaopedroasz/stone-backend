import { DatabaseConnection } from '@/infra/database'
import { CreateCustomerRoute } from '../routes'
import { ServerHttpRest } from '../contracts'

export type StartServerProps = {
  serverHttpRest: ServerHttpRest
  databaseConnection: DatabaseConnection
  port: number
}

export async function startServer (props: StartServerProps): Promise<void> {
  const { serverHttpRest, databaseConnection, port } = props
  await databaseConnection.connect()

  new CreateCustomerRoute(serverHttpRest, databaseConnection)

  serverHttpRest.listen(port)

  console.log('Server running on port 3000')
}