import { randomUUID } from 'node:crypto'

import { GenerateIdService } from '@/application/contracts'

export class GenerateIdCriptoUuidService implements GenerateIdService {
  public generate (): string {
    return randomUUID()
  }
}
