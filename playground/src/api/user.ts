import type { ResponseBody } from '~/utils/fetch'
import type { CommonTimeStamp } from '~/api/typing'

export interface LoginParams {
  username: string | null
  password: string | null
  type?: string | null
}

export interface LoginMobileParams {
  mobile: string | null
  code: string | null
  type: 'mobile'
}

export interface UserInfoType extends CommonTimeStamp{
  id?: number
  username?: string
  avatar?: string
  nickname?: string
  email?: string
  mobile?: string
  status?: number
  signature?: string
  money?: number
  pid?: number
}

export const login = (data?: LoginParams|LoginMobileParams): Promise<ResponseBody<{ token: string }>> => {
  return usePost('/user/login', data)
}

export const sendCode = (data?: { mobile: string | null }): Promise<ResponseBody> => {
  return useGet('/user/code', data)
}

export const userInfo = (): Promise<ResponseBody<UserInfoType>> => {
  return useGet('/user/info')
}
