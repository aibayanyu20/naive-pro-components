import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { STORAGE_TOKEN_KEY } from '~/composables/authorization'
import router from '~/routes'
import i18n from '~/locales'
export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  UPLOAD = 'multipart/form-data;charset=UTF-8',
}

const requestHandler = (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  const token = useAuthorization()
  /**
   * 判断是否存在token，如果存在的话，则每个http header都加上token
   */
  if (token.value) {
    config.headers = {
      ...config.headers,
      [STORAGE_TOKEN_KEY]: `Bearer ${token.value}`,
    }
  }
  return config
}
const errorHandler = (error: AxiosError): Promise<any> => {
  const globalConfig = useGlobalConfig()
  const useStore = useUserStore()
  if (error.response) {
    const { data, status, statusText } = error.response
    // 403 无访问权限
    if (status === 403) {
      globalConfig?.notification?.error({
        title: i18n.global.t('request.error.403'),
        content: (data as any)?.msg || statusText,
        duration: 3000,
      })
    }
    // 401 未登录
    if (status === 401) {
      globalConfig?.notification?.error({
        title: i18n.global.t('request.error.401'),
        content: (data as any)?.msg || statusText,
        duration: 3000,
      })
      useStore.clearState()
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      })
    }

    if (status === 500) {
      globalConfig?.notification?.error({
        title: i18n.global.t('request.error.500'),
        content: (data as any)?.msg || statusText,
        duration: 3000,
      })
    }
  }
  return Promise.reject(error)
}

const responseHandler = (response: AxiosResponse): ResponseBody<any>| AxiosResponse<any> | Promise<any> | any => {
  return response.data
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/api',
  timeout: 6000,
})

instance.interceptors.request.use(requestHandler, errorHandler)
instance.interceptors.response.use(responseHandler, errorHandler)

export const usePost = <T = Record<string, any>, R=any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.post(url, data, config)
}

export const useGet = <T = Record<string, any>, R=any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.get(url, { params, ...config })
}

export const usePut = <T = Record<string, any>, R=any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.put(url, data, config)
}

export const useDelete = <T = Record<string, any>, R=any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.delete(url, { params, ...config })
}

export default instance
