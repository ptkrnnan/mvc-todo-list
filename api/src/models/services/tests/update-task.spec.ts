import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskUseCase } from '../create-task.js'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { TitleAlreadyExistsError } from '../errors/title-already-exists.js'
import { UpdateTaskUseCase } from '../update-task.js'
import { TaskNotFoundError } from '../errors/task-not-found.js'
import { CannotUpdateCompletedTaskError } from '../errors/cannot-update-completed-task.js'

let taskRepository: InMemoryTasksRepository
let createTask: CreateTaskUseCase
let sut: UpdateTaskUseCase

describe('update task', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    createTask = new CreateTaskUseCase(taskRepository)
    sut = new UpdateTaskUseCase(taskRepository)
  })

  it('should be able to update a task', async () => {
    const task = await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'pending',
    })

    const updatedTask = await sut.execute({
      id: task.id,
      title: 'Clean the bedroom',
      priority: 'high',
      status: 'in progress',
    })

    expect(updatedTask.priority).toBe('high')
    expect(updatedTask.status).toBe('in progress')
  })

  it('should not be able to update a task with the same title', async () => {
    await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'pending',
    })

    const task2 = await createTask.execute({
      title: 'Do the dishes',
      priority: 'low',
      status: 'pending',
    })

    await expect(
      sut.execute({
        id: task2.id,
        title: 'Clean the bedroom',
        priority: 'medium',
        status: 'pending',
      })
    ).rejects.toThrowError(TitleAlreadyExistsError)
  })

  it('should not be able to update a task with the status completed', async () => {
    const task = await createTask.execute({
      title: 'Clean the room',
      priority: 'medium',
      status: 'completed',
    })

    await expect(
      sut.execute({
        id: task.id,
        title: 'Clean the bedroom',
        priority: 'medium',
        status: 'pending',
      })
    ).rejects.toThrowError(CannotUpdateCompletedTaskError)
  })

  it('should not be able to update a non-existing task', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-id',
        title: 'Clean the bedroom',
        priority: 'low',
        status: 'pending',
      })
    ).rejects.toThrowError(TaskNotFoundError)
  })

  it('should not be able to update a task with empty priority or status', async () => {
    const task = await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'pending',
    })

    const updatedTask = await sut.execute({
      id: task.id,
      title: 'Clean the bedroom',
      priority: 'high',
      status: 'in progress',
    })
  })
})
