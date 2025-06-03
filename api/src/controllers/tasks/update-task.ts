import { z } from 'zod'
import { HttpController } from '../http-controller.js'
import { HttpRequest, HttpResponse } from '../types-controller.js'
import { makeUpdateUseCase } from '../../models/services/factories/make-update-use-case.js'
import { TitleAlreadyExistsError } from '../../models/services/errors/title-already-exists.js'
import { TaskNotFoundError } from '../../models/services/errors/task-not-found.js'
import { CannotUpdateCompletedTaskError } from '../../models/services/errors/cannot-update-completed-task.js'

export class UpdateTaskController implements HttpController {
  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    const bodySchema = z.object({
      id: z.string().uuid(),
      title: z.string().min(3).max(100),
      priority: z.enum(['high', 'medium', 'low']),
      status: z.enum(['completed', 'in_progress', 'pending']),
    })

    const { id, title, priority, status } = bodySchema.parse(request.body)

    try {
      const updateUseCase = makeUpdateUseCase()
      const task = await updateUseCase.execute({
        id,
        title,
        priority,
        status,
      })
      return response.status(200).send(task)
    } catch (err) {
      const errorMap = new Map([
        [TaskNotFoundError, 404],
        [TitleAlreadyExistsError, 409],
        [CannotUpdateCompletedTaskError, 400],
      ])
      for (const [ErrorType, statusCode] of errorMap) {
        if (err instanceof ErrorType) {
          return response.status(statusCode).send({ message: err.message })
        }
      }
    }
    return response.status(500).send({ message: 'Internal server error' })
  }
}
