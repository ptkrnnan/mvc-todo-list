import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTaskDTO } from '../../models/dtos/create-task-dto.js'
import { makeCreateUseCase } from '../../models/services/factories/make-create-use-case.js'
import z from 'zod'
import { HttpError } from '../../models/services/errors/http-error.js'

export default async function createTaskController(
  request: FastifyRequest<{ Body: CreateTaskDTO }>,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    title: z.string().min(3).max(100),
    priority: z.enum(['high', 'medium', 'low']),
    status: z.enum(['completed', 'in progress', 'pending']),
  })

  const { title, priority, status } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateUseCase()
    const task = await createUseCase.execute({
      title,
      priority,
      status,
    })
    return reply.status(201).send(task)
  } catch (err) {
    if (err instanceof HttpError) {
      return reply.status(err.statusCode).send({ message: err.message })
    }
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
