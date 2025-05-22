import { CreateController } from '../../tasks/create-controller.js'
import fastifyAdapter from '../fastify-adapter.js'

export function makeCreateAdapter() {
  const createController = new CreateController()
  const createAdapter = fastifyAdapter(createController)
  return createAdapter
}
