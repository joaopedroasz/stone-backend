export type EntityNotFoundProps = {
  targetProperty: string
  targetValue: string | number
}

export class EntityNotFoundError extends Error {
  protected readonly code: number = 404

  constructor (entityName: string, props: EntityNotFoundProps) {
    super(`Entity ${entityName} not found with ${props.targetProperty} ${props.targetValue}`)
    this.name = 'EntityNotFoundError'
  }
}
