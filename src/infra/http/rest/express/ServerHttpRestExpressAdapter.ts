import cors from 'cors'
import express, { Application, json, Request, Response } from 'express'

import { HttpController } from '../../contracts'
import { ServerHttpRest, RestMethod } from '../contracts'

export class ServerHttpRestExpressAdapter implements ServerHttpRest {
  public readonly express: Application

  constructor () {
    this.express = express()
    this.express.use(json())
    this.express.use(cors())
  }

  public on (method: RestMethod, path: string, controller: HttpController): void {
    this.express[method](path, async (req: Request, res: Response) => {
      const { body, params, query } = req
      const request = {
        ...(body ?? {}),
        ...(params ?? {}),
        ...(query ?? {})
      }
      const httpResponse = await controller.handle(request)
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    })
  }

  public listen (port: number): void {
    this.express.listen(port)
  }
}
