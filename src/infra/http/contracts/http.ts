export type HttpResponse<ResponseBody = Record<string, any>> = {
  statusCode: number
  body: ResponseBody
}
