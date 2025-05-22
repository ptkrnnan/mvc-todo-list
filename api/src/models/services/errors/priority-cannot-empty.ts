import { HttpError } from "./http-error.js";

export class PriorityCannotBeEmptyError extends HttpError {
  constructor() {
    super(400, 'Priority cannot be empty')
  }
}
