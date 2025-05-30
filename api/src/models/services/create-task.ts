import { Priority, Status, Task } from '../entities/task.js'
import { TaskRepository } from '../repositories/taskRepository.js'
import { TitleAlreadyExistsError } from './errors/title-already-exists.js'

interface CreateTaskUseCaseRequest {
  title: string
  priority: Priority
  status: Status
}
interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    title,
    priority,
    status,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const taskAlreadyExists = await this.taskRepository.findByTitle(title)
    if (taskAlreadyExists) throw new TitleAlreadyExistsError()

    const task = await this.taskRepository.create({
      title,
      priority,
      status,
    })

    return { task }
  }
}
