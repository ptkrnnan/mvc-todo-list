export class StatusCannotBeEmptyError extends Error {
  constructor() {
    super('Status cannot be empty')
  }
}
