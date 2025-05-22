import { HttpError } from './http-error.js'

export class CannotUpdateCompletedTaskError extends HttpError {
  constructor() {
    super(409, 'Cannot update a completed task.')
  }
}
