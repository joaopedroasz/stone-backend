import { randomUUID } from 'node:crypto'

import { GenerateIdService } from '@/application/contracts'

export class GenerateIdCriptoUuidService implements GenerateIdService {
  public generate (): string {
    randomUUID()

    return 'any_id'
  }
}
