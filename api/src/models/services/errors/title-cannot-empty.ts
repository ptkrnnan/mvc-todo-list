import { HttpError } from './http-error.js'

export class TitleCannotBeEmptyError extends HttpError {
  constructor() {
    super(400, 'Title cannot be empty')
  }
}
