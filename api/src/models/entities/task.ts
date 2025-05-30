import { randomUUID, UUID } from 'node:crypto'
import { TitleCannotBeEmptyError } from './errors/title-cannot-empty.js'
import { PriorityCannotBeEmptyError } from './errors/priority-cannot-empty.js'
import { StatusCannotBeEmptyError } from './errors/status-cannot-empty.js'

export type Priority = 'high' | 'medium' | 'low'
export type Status = 'completed' | 'in_progress' | 'pending'

export class Task {
  public readonly id: UUID
  public title: string
  public priority: Priority
  public status: Status
  public readonly created_at: Date
  public update_at: Date

  constructor(title: string, priority: Priority, status: Status) {
    this.id = randomUUID()
    this.title = title
    this.priority = priority
    this.status = status
    this.created_at = new Date()
    this.update_at = new Date()
    this.validate(title, priority, status)
  }

  validate(title: string, priority: Priority, status: Status) {
    if (!title) throw new TitleCannotBeEmptyError()
    if (!priority) throw new PriorityCannotBeEmptyError()
    if (!status) throw new StatusCannotBeEmptyError()
    if (title.length < 3 || title.length > 100)
      throw new Error('The title must be between 3 and 100 characters long')
  }

  // business rules entities
  changeTitle(newTitle: string) {
    if (!newTitle) throw new TitleCannotBeEmptyError()
    this.title = newTitle
    this.updateTask()
  }

  changePriority(newPriority: Priority) {
    if (!newPriority) throw new PriorityCannotBeEmptyError()
    this.priority = newPriority
    this.updateTask()
  }

  changeStatus(newStatus: Status) {
    if (!newStatus) throw new StatusCannotBeEmptyError()
    this.status = newStatus
    this.updateTask()
  }

  updateTask() {
    this.update_at = new Date()
  }
}
