export class TitleAlreadyExistsError extends Error {
  constructor() {
    super('A task with this title already exists.')
  }
}
