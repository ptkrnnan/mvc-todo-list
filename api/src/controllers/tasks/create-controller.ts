import { z } from 'zod'
import { makeCreateUseCase } from '../../models/services/factories/make-create-use-case.js'
import { HttpError } from '../../models/services/errors/http-error.js'
import { BaseController } from '../base-controller.js'
import { ControllerRequest, ControllerResponse } from '../controller-types.js'

export class CreateController implements BaseController {
  async handler(request: ControllerRequest, response: ControllerResponse) {
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
      return response.status(201).send(task)
    } catch (err) {
      if (err instanceof HttpError) {
        return response.status(err.statusCode).send({ message: err.message })
      }
    }
    return response.status(500).send({ message: 'Internal server error' })
  }
}
