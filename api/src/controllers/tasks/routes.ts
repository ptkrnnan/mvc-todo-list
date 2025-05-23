import { FastifyInstance } from 'fastify'
import { fastifyAdapter } from '../adapters/fastify-adapter.js'
import { CreateTaskController } from './create-task.js'

export function tasksRoutes(app: FastifyInstance) {
  app.post('/create', fastifyAdapter(new CreateTaskController()))
}
