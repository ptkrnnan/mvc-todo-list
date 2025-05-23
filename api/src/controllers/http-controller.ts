import { HttpRequest, HttpResponse } from './types-controller.js'

export interface HttpController {
  handle(request: HttpRequest, response: HttpResponse): Promise<void>
}
