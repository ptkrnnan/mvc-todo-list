import { Task } from '../entities/task.js'
import { TaskRepository } from '../repositories/taskRepository.js'
import { TaskNotFoundError } from './errors/task-not-found.js'

interface DeleteTaskUseCaseRequest {
  id: string
}

interface DeleteTaskUseCaseResponse {
  task: Task
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    id,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(id)
    if (!task) throw new TaskNotFoundError()
    await this.taskRepository.delete(task.id)

    return { task }
  }
}
