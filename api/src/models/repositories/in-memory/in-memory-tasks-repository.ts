import { Task } from '../../entities/task.js'
import { TaskNotFoundError } from '../../services/errors/task-not-found.js'
import { TaskRepository } from '../taskRepository.js'

export class InMemoryTasksRepository implements TaskRepository {
  public items: Task[] = []

  async create(data: any): Promise<Task> {
    const task = new Task(data.title, data.priority, data.status)

    this.items.push(task)
    return task
  }

  async update(data: any): Promise<Task> {
    const task = await this.findById(data.id)
    if (!task) throw new TaskNotFoundError()

    if (data.title) task.changeTitle(data.title)
    if (data.priority) task.changePriority(data.priority)
    if (data.status) task.changeStatus(data.status)

    return task
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === id)
    if (taskIndex === -1) throw new TaskNotFoundError()
    this.items.splice(taskIndex, 1)
  }

  async findByTitle(title: string): Promise<Task | null> {
    const task = this.items.find((item) => item.title === title)
    return task || null
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === id)
    return task || null
  }

  async findAll(): Promise<Task[]> {
    return this.items
  }

  async findAllFiltered(filters: any): Promise<Task[]> {
    return this.items.filter((task) => {
      if (filters.priority && task.priority !== filters.priority) return false
      if (filters.status && task.status !== filters.status) return false
      return true
    })
  }
}
