import { useUserStore } from '@/store/user'
import { http, type IGetOptions } from '../utils'

const URLS = {
  ARTICLE_LIST: '/api/articles/all',
  ARTICLE_ID: '/api/articles/',
  TOP_FEATURE_ARTICLES: '/api/articles/topAndFeatured',
  ARTICLE_TAG: '/api/articles/tagId',
  ARTICLE_CATE: '/api/articles/categoryId',
  ACCESS_ARTICLE: '/api/articles/access'
}

export interface ArticleRequest {
  current: number
  size: number
  tagId?: number
  categoryId?: number
}

export interface AccessArticle {
  articleId: number
  articlePassword: string
}

export const getArticleList = (searchParams: ArticleRequest) => {
  return http.get(URLS.ARTICLE_LIST, { query: searchParams })
}

export const getArticleById = (articleId: number) => {
  const Header = {
    Authorization: 'Bearer ' + useUserStore().token
  }
  return http.get(URLS.ARTICLE_ID + articleId, { headers: Header })
}

export const getTopAndFeaturedArticles = () => {
  return http.get(URLS.TOP_FEATURE_ARTICLES)
}

export const getArticleByTag = (param: ArticleRequest) => {
  return http.get(URLS.ARTICLE_TAG, { query: param })
}

export const getArticleByCategory = (param: ArticleRequest) => {
  return http.get(URLS.ARTICLE_CATE, { query: param })
}

export const accessArticle = (param: AccessArticle) => {
  const Header = {
    Authorization: 'Bearer ' + useUserStore().token
  }
  return http.post(URLS.ACCESS_ARTICLE, { json: param, headers: Header })
}
