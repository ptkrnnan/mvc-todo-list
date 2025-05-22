import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { CreateTaskUseCase } from '../create-task.js'

export function makeCreateUseCase() {
  const tasksRepository = new InMemoryTasksRepository()
  const createTaskUseCase = new CreateTaskUseCase(tasksRepository)

  return createTaskUseCase
}
