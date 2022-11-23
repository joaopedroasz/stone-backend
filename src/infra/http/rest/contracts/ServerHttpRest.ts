import { HttpController } from '../../contracts'

export type RestMethod = 'get' | 'post' | 'put' | 'delete'

export interface ServerHttpRest {
  on: (method: RestMethod, path: string, controller: HttpController) => void
  listen: (port: number) => void
}
