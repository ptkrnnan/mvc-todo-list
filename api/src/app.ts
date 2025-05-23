import fastify from 'fastify'
import { ZodError } from 'zod'
import { tasksRoutes } from './controllers/tasks/routes.js'

export const app = fastify()

app.register(tasksRoutes)

// Middleware validation error zod
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }
})
