import { ControllerRequest, ControllerResponse } from './controller-types.js'

export interface BaseController<
  Request = ControllerRequest,
  Response = ControllerResponse
> {
  handler(request: Request, response: Response): Promise<any>
}
