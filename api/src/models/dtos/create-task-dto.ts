import { Priority, Status } from "../entities/task.js"

export interface CreateTaskDTO {
  title: string
  priority: Priority
  status: Status
}