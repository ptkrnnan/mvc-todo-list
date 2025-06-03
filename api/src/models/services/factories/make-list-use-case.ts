import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { ListTasksUseCase } from '../list-tasks.js'

export function makeListUseCase() {
  const tasksRepository = new InMemoryTasksRepository()
  const listTaskUseCase = new ListTasksUseCase(tasksRepository)

  return listTaskUseCase
}
