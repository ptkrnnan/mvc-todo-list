import { Task } from '../entities/task.js'

export interface TaskRepository {
  create(data: any): Promise<Task>
  update(data: any): Promise<Task>
  delete(id: string): Promise<void>
  findByTitle(title: string): Promise<Task | null>
  findById(id: string): Promise<Task | null>
  findAll(): Promise<Task[]>
  findAllFiltered(filters: any): Promise<Task[]>
}
