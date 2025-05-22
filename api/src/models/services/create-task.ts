import { CreateTaskDTO } from '../dtos/create-task-dto.js'
import { Task } from '../entities/task.js'
import { TaskRepository } from '../repositories/taskRepository.js'
import { TitleAlreadyExistsError } from './errors/title-already-exists.js'

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ title, priority, status }: CreateTaskDTO): Promise<Task> {
    const taskAlreadyExists = await this.taskRepository.findByTitle(title)
    if (taskAlreadyExists) throw new TitleAlreadyExistsError()

    const task = await this.taskRepository.create({
      title,
      priority,
      status,
    })

    return task
  }
}
