import { HttpError } from "./http-error.js";

export class InvalidTitleLengthError extends HttpError {
  constructor() {
    super(400, 'The title must be between 3 and 100 characters long')
  }
}
