import { FastifyInstance } from 'fastify'
import createTaskController from './create-controller.js'

export function tasksRoutes(app: FastifyInstance) {
  app.post('/create', createTaskController)
}
