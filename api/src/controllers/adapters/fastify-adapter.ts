import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpController } from '../http-controller.js'
import { HttpRequest, HttpResponse } from '../types-controller.js'

export function fastifyAdapter(controller: HttpController) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
    }

    const httpResponse: HttpResponse = {
      status(code: number) {
        reply.status(code)
        return this
      },
      send(body: any) {
        reply.send(body)
      },
    }

    await controller.handle(httpRequest, httpResponse)
  }
}
