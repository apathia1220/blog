import { defineStore } from 'pinia'

export interface UserInfo {
  avatar: string | null | undefined
  email: string
  id: number
  ipAddress: string | null
  ipSource: string | null
  lastLoginTime: string | null
  loginType: number
  nickname: string | null
  token: string
  userInfoId: number
  username: string
  website?: string
  intro?: string
}

export interface UserStore {
  userInfo: UserInfo | null
  token: string | null
  accessArticles: number[]
}

export interface UserResponse {
  data: UserInfo | null
  code: number
  flag?: boolean
  message: string
}

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => {
    return {
      userInfo: null,
      token: '',
      accessArticles: []
    }
  },
  getters: {
    headerAuth(state) {
      return {
        headers: {
          Authorization: 'Bearer ' + state.userInfo?.token
        }
      }
    }
  },
  persist: {
    storage: window.sessionStorage
  }
})
