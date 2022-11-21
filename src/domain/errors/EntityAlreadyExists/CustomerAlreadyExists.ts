import { EntityAlreadyExistsError, EntityAlreadyExistsProps } from './EntityAlreadyExists'

export class CustomerAlreadyExistsError extends EntityAlreadyExistsError {
  constructor (props: EntityAlreadyExistsProps) {
    super('customer', props)
  }
}
