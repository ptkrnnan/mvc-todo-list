import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskUseCase } from '../create-task.js'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { DeleteTaskUseCase } from '../delete.task.js'
import { TaskNotFoundError } from '../errors/task-not-found.js'

let taskRepository: InMemoryTasksRepository
let createTask: CreateTaskUseCase
let sut: DeleteTaskUseCase

describe('delete task', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    createTask = new CreateTaskUseCase(taskRepository)
    sut = new DeleteTaskUseCase(taskRepository)
  })

  it('should be able to delete a task', async () => {
    const task = await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'pending',
    })

    await sut.execute({
      id: task.id,
    })

    const foundTask = await taskRepository.findById(task.id)
    expect(foundTask).toBeNull()
  })

  it('should not be able to delete a non-existing task', async () => {
    await expect(sut.execute({ id: 'non-existing-id' })).rejects.toThrowError(
      TaskNotFoundError
    )
  })

  it('should remove task from the repository', async () => {
    const task = await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'low',
      status: 'completed',
    })

    await sut.execute({ id: task.id })
    const deleted = await taskRepository.findById(task.id)
    expect(deleted).toBeNull()
  })
})
