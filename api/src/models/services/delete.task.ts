import { DeleteTaskDTO } from '../dtos/delete-task-dto.js'
import { TaskRepository } from '../repositories/taskRepository.js'
import { TaskNotFoundError } from './errors/task-not-found.js'

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: DeleteTaskDTO): Promise<void> {
    const existingTask = await this.taskRepository.findById(id)
    if (!existingTask) throw new TaskNotFoundError()
    await this.taskRepository.delete(existingTask.id)
  }
}
