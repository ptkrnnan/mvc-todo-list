import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { UpdateTaskUseCase } from '../update-task.js'

export function makeUpdateUseCase() {
  const tasksRepository = new InMemoryTasksRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository)

  return updateTaskUseCase
}
