import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTaskDTO } from '../../models/dtos/create-task-dto.js'
import { BaseController } from '../base-controller.js'

export default function fastifyAdapter(controller: BaseController) {
  return async (
    request: FastifyRequest<{ Body: CreateTaskDTO }>,
    reply: FastifyReply
  ) => {
    await controller.handler(
      {
        body: request.body,
      },
      {
        status: (code: number) => {
          reply.status(code)
          return reply
        },
        send: (body?: any) => reply.send(body),
      }
    )
  }
}
