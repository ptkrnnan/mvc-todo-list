import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { DeleteTaskUseCase } from '../delete.task.js'

export function makeDeleteUseCase() {
  const tasksRepository = new InMemoryTasksRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository)

  return deleteTaskUseCase
}
