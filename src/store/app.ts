import { defineStore } from 'pinia'

export interface AppState {
  websiteConfig: Record<string, any> | null
  viewCount: number
  articleCount: number
  talkCount: number
  categoryCount: number
  tagCount: number
  websiteConfigDTO?: Record<string, any>
}

export interface AppResponse {
  data: AppState | null
  code: number
  flag?: boolean
  message: string
}

export const useAppStore = defineStore('appStore', {
  state: (): AppState => {
    return {
      websiteConfig: null,
      viewCount: 0,
      articleCount: 0,
      talkCount: 0,
      categoryCount: 0,
      tagCount: 0
    }
  }
})
