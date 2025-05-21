import { Priority, Status } from '../entities/task.js'

export interface UpdateTaskDTO {
  id: string
  title: string
  priority: Priority
  status: Status
}
