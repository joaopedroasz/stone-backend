export class CustomerNotUpdatedError extends Error {
  constructor () {
    super('Customer not updated')
    this.name = 'CustomerNotUpdatedError'
  }
}
