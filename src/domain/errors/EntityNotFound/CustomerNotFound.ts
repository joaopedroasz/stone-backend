import { EntityNotFoundError, EntityNotFoundProps } from './EntityNotFound'

export class CustomerNotFoundError extends EntityNotFoundError {
  constructor (props: EntityNotFoundProps) {
    super('customer', props)
  }
}
