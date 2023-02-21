import { http } from '../utils'

const URLS = {
  CATE_ALL: '/api/categories/all'
}

export interface CateItem {
  id: number
  articleCount: number
  categoryName: string
}

export interface CateListResponse {
  code: number
  data: CateItem[]
  flag: boolean
  message: string
}

export const getAllCates = () => {
  return http.get(URLS.CATE_ALL)
}
