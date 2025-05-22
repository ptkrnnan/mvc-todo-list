import { Priority, Status } from '../models/entities/task.js'

export interface ControllerRequestBody {
  id?: string
  title: string
  priority: Priority
  status: Status
}

export interface ControllerRequest {
  body: ControllerRequestBody
}

export interface ControllerResponse {
  status: (code: number) => ControllerResponse
  send: (body?: any) => void
}
