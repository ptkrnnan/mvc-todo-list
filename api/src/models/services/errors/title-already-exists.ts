import { HttpError } from "./http-error.js";

export class TitleAlreadyExistsError extends HttpError {
  constructor() {
    super(400, 'A task with this title already exists.')
  }
}
