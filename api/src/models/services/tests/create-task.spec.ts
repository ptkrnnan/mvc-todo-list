import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTaskUseCase } from '../create-task.js'
import { InMemoryTasksRepository } from '../../repositories/in-memory/in-memory-tasks-repository.js'
import { TitleAlreadyExistsError } from '../errors/title-already-exists.js'

let taskRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('create task', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(taskRepository)
  })

  it('should be able to create a task', async () => {
    const task = await sut.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'pending',
    })

    expect(task.title).toEqual('Clean the bedroom')
  })

  it('should not be able to create a task with the same title', async () => {
    await sut.execute({
      title: 'Clean the bedroom',
      priority: 'medium',
      status: 'pending',
    })

    await expect(
      sut.execute({
        title: 'Clean the bedroom',
        priority: 'high',
        status: 'completed',
      })
    ).rejects.toThrowError(TitleAlreadyExistsError)
  })
})
