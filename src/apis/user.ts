import { http } from '@/utils'
import { useUserStore } from '@/store/user'

const URLS = {
  LOGIN: '/api/users/login',
  LOGOUT: '/api/users/logout',
  REGISTER: '/api/users/register',
  EMAILCODE: '/api/users/code',
  BIND_EMAIL: '/api/users/email',
  USER_INFO: '/api/users/info'
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm extends LoginForm {
  code: number | null
}

export interface BindEmailForm {
  code: number | null
  email: string
}

export interface UserInfoForm {
  nickname: string
  website: string | null
  intro: string | null
}

export const login = (param: LoginForm) => {
  return http.post(URLS.LOGIN, { form: param })
}

export const logout = () => {
  const Header = {
    Authorization: 'Bearer ' + useUserStore().token
  }
  return http.post(URLS.LOGOUT, { headers: Header })
}

export const register = (param: RegisterForm) => {
  return http.post(URLS.REGISTER, { json: param })
}

export const getCode = (email: string) => {
  return http.get(URLS.EMAILCODE + `?username=${email}`)
}

export const bindEmail = (param: BindEmailForm) => {
  const Header = {
    Authorization: 'Bearer ' + useUserStore().token
  }
  http.put(URLS.BIND_EMAIL, { json: param, headers: Header })
}

export const submitUserInfo = (param: UserInfoForm) => {
  const Header = {
    Authorization: 'Bearer ' + useUserStore().token
  }
  return http.put(URLS.USER_INFO, { json: param, headers: Header })
}
