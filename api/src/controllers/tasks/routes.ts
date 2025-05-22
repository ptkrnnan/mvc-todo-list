import { FastifyInstance } from 'fastify'
import { makeCreateAdapter } from '../adapters/factories/make-create-adapter.js'

export function tasksRoutes(app: FastifyInstance) {
  app.post('/create', makeCreateAdapter())
}
