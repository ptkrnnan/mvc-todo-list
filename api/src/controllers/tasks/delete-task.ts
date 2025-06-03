import { z } from 'zod'
import { HttpController } from '../http-controller.js'
import { HttpRequest, HttpResponse } from '../types-controller.js'
import { makeDeleteUseCase } from '../../models/services/factories/make-delete-use-case.js'
import { TaskNotFoundError } from '../../models/services/errors/task-not-found.js'

export class DeleteTaskController implements HttpController {
  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    const bodySchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = bodySchema.parse(request.params)

    try {
      const deleteUseCase = makeDeleteUseCase()
      const task = await deleteUseCase.execute({ id })
      return response.status(200).send(task)
    } catch (err) {
      if (err instanceof TaskNotFoundError) {
        return response.status(404).send({ message: err.message })
      }
    }
    return response.status(500).send({ message: 'Internal server error' })
  }
}
