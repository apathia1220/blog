import { http } from '../utils'

const URLS = {
  TAG_ALL: '/api/tags/all'
}

export interface TagItem {
  id: number
  count: number
  tagName: string
}

export interface TagListResponse {
  code: number
  data: TagItem[]
  flag: boolean
  message: string
}

export const getAllTags = () => {
  return http.get(URLS.TAG_ALL)
}
