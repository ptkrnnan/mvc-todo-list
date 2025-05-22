import { HttpError } from "./http-error.js";

export class TaskNotFoundError extends HttpError {
  constructor() {
    super(400, 'Task not found.')
  }
}
