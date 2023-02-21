import { http } from '@/utils'

const URLS = {
  TALK_LIST: '/api/talks'
}

export interface TalkItem {
  avatar: string | null
  commentCount: number
  content: string
  createTime: string | null
  id: number | null
  images: string
  imgs: string[]
  isTop: 0
  nickname: string
}

export interface TalkResponse {
  code: number
  data: {
    count: number
    records: TalkItem[]
  }
  flag?: boolean
  message: string
}

export interface TalkRequest {
  type: number
  topicId?: number | string
  current: number
  size: number
}

export const getTalkList = (param: Record<'size' | 'current', number | null>) => {
  return http.get(URLS.TALK_LIST, { query: param })
}
