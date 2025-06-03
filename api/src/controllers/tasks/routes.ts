import { FastifyInstance } from 'fastify'
import { fastifyAdapter } from '../adapters/fastify-adapter.js'
import { CreateTaskController } from './create-task.js'
import { DeleteTaskController } from './delete-task.js'
import { ListTasksController } from './list-task.js'
import { UpdateTaskController } from './update-task.js'

export function tasksRoutes(app: FastifyInstance) {
  app.post('/create', fastifyAdapter(new CreateTaskController()))
  app.delete('/delete', fastifyAdapter(new DeleteTaskController()))
  app.get('/list', fastifyAdapter(new ListTasksController()))
  app.put('/update', fastifyAdapter(new UpdateTaskController()))
}
