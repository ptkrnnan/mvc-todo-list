import { HttpError } from './http-error.js'

export class TaskNotFoundError extends HttpError {
  constructor() {
    super(404, 'Task not found.')
  }
}
