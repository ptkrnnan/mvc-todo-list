import { CreateTaskDTO } from '../dtos/create-task-dto.js'
import { ListTasksDTO } from '../dtos/list-tasks-dto.js'
import { UpdateTaskDTO } from '../dtos/update-task-dto.js'
import { Task } from '../entities/task.js'

export interface TaskRepository {
  create(data: CreateTaskDTO): Promise<Task>
  update(data: UpdateTaskDTO): Promise<Task>
  delete(id: string): Promise<void>
  findByTitle(title: string): Promise<Task | null>
  findById(id: string): Promise<Task | null>
  findAll(): Promise<Task[]>
  findAllFiltered(filters: ListTasksDTO): Promise<Task[]>
}
