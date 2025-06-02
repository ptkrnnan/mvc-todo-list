import { Priority, Status, Task } from '../entities/task.js'
import { TaskRepository } from '../repositories/taskRepository.js'

interface ListTasksUseCaseRequest {
  id?: string
  title?: string
  priority?: Priority
  status?: Status
}

interface ListTasksUseCaseResponse {
  task: Task[]
}

export class ListTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    filters: ListTasksUseCaseRequest = {}
  ): Promise<ListTasksUseCaseResponse> {
    const allTasks = await this.taskRepository.findAll()

    const task = allTasks.filter((task) => {
      return (
        (!filters.id || task.id === filters.id) &&
        (!filters.title || task.title.includes(filters.title)) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.status || task.status === filters.status)
      )
    })

    task.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())

    return { task }
  }
}
