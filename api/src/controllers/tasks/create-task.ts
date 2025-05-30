import { z } from 'zod'
import { CreateTaskDTO } from '../../models/dtos/create-task-dto.js'
import { TitleAlreadyExistsError } from '../../models/services/errors/title-already-exists.js'
import { makeCreateUseCase } from '../../models/services/factories/make-create-use-case.js'
import { HttpController } from '../http-controller.js'
import { HttpRequest, HttpResponse } from '../types-controller.js'

export class CreateTaskController implements HttpController {
  async handle(
    request: HttpRequest<CreateTaskDTO>,
    response: HttpResponse
  ): Promise<void> {
    const bodySchema = z.object({
      title: z.string().min(3).max(100),
      priority: z.enum(['high', 'medium', 'low']),
      status: z.enum(['completed', 'in_progress', 'pending']),
    })

    const { title, priority, status } = bodySchema.parse(request.body)

    try {
      const createUseCase = makeCreateUseCase()
      const task = await createUseCase.execute({
        title,
        priority,
        status,
      })

      return response.status(201).send(task)
    } catch (err) {
      if (err instanceof TitleAlreadyExistsError) {
        return response.status(409).send({ message: err.message })
      }
    }
    return response.status(500).send({ message: 'Internal server error' })
  }
}
