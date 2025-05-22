export class TitleCannotBeEmptyError extends Error {
  constructor() {
    super('Title cannot be empty')
  }
}
