import axios, { Method, Axios, AxiosResponse } from 'axios'

export type ApiURL = string
export type ApiBaseURL = string
export type ApiHeaders = { [key: string]: string }
export type ApiResponseHeaders = Record<string, string> & {
  'set-cookie'?: string[]
}

export interface IApiResponse<D = unknown> {
  status: number
  headers: ApiResponseHeaders
  data: D
}

export interface IApiOptions<D = unknown> {
  baseURL?: ApiBaseURL
  url?: string
  method?: Method
  headers?: ApiHeaders
  data?: D
  params?: never
  withAuth?: boolean
  token?: string
}

export class Api {
  private axios: Axios
  public static sharedToken: string

  constructor(options?: IApiOptions) {
    this.axios = axios.create(options)
    this.axios.interceptors.response.use(this.normalizeResponse)
  }

  private normalizeResponse(response: AxiosResponse): IApiResponse {
    const { data, headers, status } = response

    return { data, headers, status }
  }

  public static setSharedToken(token: string): void {
    Api.sharedToken = token

    // FIXME: Create a service to persist data
    // Token shouldn't be store in local storage
    localStorage.setItem('token', token)
  }

  send<R = unknown>(options: IApiOptions | string): Promise<IApiResponse<R>> {
    if (typeof options === 'string') options = { url: options, method: 'GET' }

    options.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      ...(options.headers || {}),
    }

    const { withAuth, token, ...apiOptions } = options

    if (withAuth) {
      apiOptions.headers = apiOptions.headers ?? {}
      apiOptions.headers.Authorization = `Token ${token || Api.sharedToken || localStorage.getItem('token')}`
    }

    // TODO: Normalize Errors with assertion service
    return this.axios.request(apiOptions)
  }
}
