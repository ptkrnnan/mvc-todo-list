import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskUseCase } from '../create-task.js'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { ListTasksUseCase } from '../list-tasks.js'

let taskRepository: InMemoryTasksRepository
let createTask: CreateTaskUseCase
let sut: ListTasksUseCase

describe('list all tasks', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    createTask = new CreateTaskUseCase(taskRepository)
    sut = new ListTasksUseCase(taskRepository)
  })

  it('should be able to list all tasks', async () => {
    await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'low',
      status: 'in_progress',
    })

    await createTask.execute({
      title: 'Clean the bedroom 2',
      priority: 'low',
      status: 'in_progress',
    })

    const tasks = await sut.execute()
    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toBe('Clean the bedroom')
    expect(tasks[1].title).toBe('Clean the bedroom 2')
  })

  it('should be able to list tasks filtered by priority and status', async () => {
    await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'low',
      status: 'in_progress',
    })

    await createTask.execute({
      title: 'Clean the bedroom 2',
      priority: 'low',
      status: 'in_progress',
    })

    const tasks = await sut.execute({ priority: 'low', status: 'in_progress' })
    expect(tasks.forEach((task) => expect(task.priority).toBe('low')))
    expect(tasks.forEach((task) => expect(task.status).toBe('in_progress')))
  })

  it('should return an empty array if no tasks match filters', async () => {
    await createTask.execute({
      title: 'Task 1',
      priority: 'low',
      status: 'completed',
    })

    const tasks = await sut.execute({ priority: 'high', status: 'pending' })
    expect(tasks).toEqual([])
  })

  it('should return all tasks if no filters are provided', async () => {
    await createTask.execute({
      title: 'Task 1',
      priority: 'low',
      status: 'completed',
    })

    await createTask.execute({
      title: 'Task 2',
      priority: 'high',
      status: 'pending',
    })

    const tasks = await sut.execute({})
    expect(tasks.length).toEqual(2)
  })

  it('should filter tasks by title', async () => {
    await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'completed',
    })

    await createTask.execute({
      title: 'Clean the bedroom 2',
      priority: 'low',
      status: 'in_progress',
    })

    const tasks = await sut.execute({ title: 'Clean the bedroom' })
    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toContain('Clean the bedroom')
    expect(tasks[1].title).toContain('Clean the bedroom')
  })

  it('should filter tasks by id', async () => {
    const { task } = await createTask.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'completed',
    })

    await createTask.execute({
      title: 'Clean the bedroom 2',
      priority: 'low',
      status: 'in_progress',
    })

    const tasks = await sut.execute({ id: task.id })
    expect(tasks).toHaveLength(1)
    expect(tasks[0].id).toBe(task.id)
  })
})
