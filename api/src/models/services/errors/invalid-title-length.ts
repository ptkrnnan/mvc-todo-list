export class InvalidTitleLengthError extends Error {
  constructor() {
    super('The title must be between 3 and 100 characters long')
  }
}
