import { HttpError } from "./http-error.js";

export class StatusCannotBeEmptyError extends HttpError {
  constructor() {
    super(400, 'Status cannot be empty')
  }
}
