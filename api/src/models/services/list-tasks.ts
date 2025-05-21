import { ListTasksDTO } from '../dtos/list-tasks-dto.js'
import { Task } from '../entities/task.js'
import { TaskRepository } from '../repositories/taskRepository.js'

export class ListTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(filters: ListTasksDTO = {}): Promise<Task[]> {
    const allTasks = await this.taskRepository.findAll()

    const filtered = allTasks.filter((task) => {
      return (
        (!filters.id || task.id === filters.id) &&
        (!filters.title || task.title.includes(filters.title)) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.status || task.status === filters.status)
      )
    })

    filtered.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())

    return filtered
  }
}
