import { useUserStore } from '@/store/user'
import { http } from '@/utils'

const URLS = {
  COMMENT_LIST: '/api/comments',
  SAVE_COMMENT: '/api/comments/save'
}

export interface CommentReuqest {
  type: number
  topicId?: number
  current: number
  size: number
}

export interface CommentItem {
  avatar: string | null
  commentContent: string | null
  createTime: string | null
  id: number
  nickname: string
  replyDTOs?: CommentReplyItem[] | null
  userId: number | null
  webSite: string | null
}

export interface CommentReplyItem extends CommentItem {
  parentId: number | null
  replyNickname: string | null
  replyUserId: number | null
  replyWebsite: string | null
}

export interface CommentResponse {
  code: number
  data: {
    count: number
    records: CommentItem[]
  }
  flag?: boolean
  message: string
}

export interface SaveCommentRequest {
  commentContent: string
  type: number
  topicId?: string | null
  parentId?: number | null
  replyUserId?: number | null
}

export const getCommentList = (param: CommentReuqest) => {
  return http.get(URLS.COMMENT_LIST, { query: param })
}

export const getCommentsByCommentId = (commentId: number) => {
  return http.get(URLS.COMMENT_LIST + `/${commentId}` + '/replies')
}

export const saveComment = (param: SaveCommentRequest) => {
  const Header = {
    Authorization: 'Bearer ' + useUserStore().token
  }
  return http.post(URLS.SAVE_COMMENT, { json: param, headers: Header })
}
