import fastify from 'fastify'
import { tasksRoutes } from './controllers/tasks/routes.js'
import { ZodError } from 'zod'

const app = fastify()

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

app
  .listen({
    port: 3000,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server Running!')
  })
