import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'

describe('create task (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create task', async () => {
    const response = await request(app.server).post('/create').send({
      title: 'Create',
      priority: 'high',
      status: 'in_progress',
    })
    expect(response.statusCode).toEqual(201)
  })

  // it('should not be able to create a task with the same title', async () => {
  //   await request(app.server).post('/create').send({
  //     title: 'Create',
  //     priority: 'high',
  //     status: 'in progress',
  //   })

  //   const response = await request(app.server).post('/create').send({
  //     title: 'Create',
  //     priority: 'high',
  //     status: 'in progress',
  //   })

  //   expect(response.statusCode).toEqual(409)
  // })
})
