export type EntityAlreadyExistsProps = {
  targetProperty: string
  targetValue: string | number
}

export class EntityAlreadyExistsError extends Error {
  protected readonly code: number = 409

  constructor (entityName: string, props: EntityAlreadyExistsProps) {
    super(`Entity ${entityName} with ${props.targetProperty} ${props.targetValue} already exists`)
    this.name = 'EntityAlreadyExistsError'
  }
}
