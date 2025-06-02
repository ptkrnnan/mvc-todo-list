import { Priority, Status, Task } from '../entities/task.js'
import { TaskRepository } from '../repositories/taskRepository.js'
import { CannotUpdateCompletedTaskError } from './errors/cannot-update-completed-task.js'
import { TaskNotFoundError } from './errors/task-not-found.js'
import { TitleAlreadyExistsError } from './errors/title-already-exists.js'

interface UpdateTaskUseCaseRequest {
  id: string
  title: string
  priority: Priority
  status: Status
}

interface UpdateTaskUseCaseResponse {
  task: Task
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    id,
    title,
    priority,
    status,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const existingTask = await this.taskRepository.findById(id)
    if (!existingTask) throw new TaskNotFoundError()

    const taskWithSameTitle = await this.taskRepository.findByTitle(title)
    if (taskWithSameTitle && taskWithSameTitle.id !== id)
      throw new TitleAlreadyExistsError()

    if (existingTask.status === 'completed')
      throw new CannotUpdateCompletedTaskError()

    existingTask.changeTitle(title)
    existingTask.changePriority(priority)
    existingTask.changeStatus(status)

    const task = await this.taskRepository.update(existingTask)

    return { task }
  }
}
