import { z } from 'zod'
import { HttpController } from '../http-controller.js'
import { HttpRequest, HttpResponse } from '../types-controller.js'
import { makeListUseCase } from '../../models/services/factories/make-list-use-case.js'

export class ListTasksController implements HttpController {
  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    const bodySchema = z.object({
      id: z.string().optional(),
      title: z.string().optional(),
      priority: z.enum(['high', 'medium', 'low']).optional(),
      status: z.enum(['completed', 'in_progress', 'pending']).optional(),
    })

    const filters = bodySchema.parse(request.body)

    try {
      const listUseCase = makeListUseCase()
      const { task } = await listUseCase.execute(filters)
      return response.status(200).send(task)
    } catch (err) {
      return response.status(500).send({ message: 'Internal server error' })
    }
  }
}
