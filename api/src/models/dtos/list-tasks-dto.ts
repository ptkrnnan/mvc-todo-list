import { Priority, Status } from '../entities/task.js'

export interface ListTasksDTO {
  id?: string
  title?: string
  priority?: Priority
  status?: Status
}
