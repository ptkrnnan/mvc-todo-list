export interface HttpRequest<T = any> {
  body: T
  params?: any
  query?: any
  headers?: any
}

export interface HttpResponse {
  status(code: number): HttpResponse
  send(body: any): void
}
