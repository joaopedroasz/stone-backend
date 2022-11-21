export class CustomerNotCreatedError extends Error {
  constructor () {
    super('Customer not created')
    this.name = 'CustomerNotCreatedError'
  }
}
