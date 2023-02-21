import { defineStore } from 'pinia'

interface Author {
  id: null | number
  email: null | string
  createTime: null | string
  avatar: string
  intro: string | null
  isDisable: null | number
  isSubscribe: number | null
  nickname: string | null
  updateTime: null | string
  website: string | null
}

interface TagItem {
  id: number | null
  tagName: string
  createTime: null | string
  updateTagTime: null | string
}

export interface TopFeatureArticleItem {
  id: number
  articleContent: string
  articleCover: string
  articleTitle: string
  author: Author
  categoryName: string
  createTime: string
  isFeatured: number
  isTop: number
  status: number | null
  tags: TagItem[]
  updateTime: string
}

export interface ArticleItem extends TopFeatureArticleItem {
  isDelete: number | null
  nextArticleCard: TopFeatureArticleItem
  originalUrl: string | null
  preArticleCard: TopFeatureArticleItem
  type: number
  viewCount: number
}

export interface TopArticleResponse {
  data: Record<'featuredArticles' | 'topArticle', TopFeatureArticleItem[]> | null
  code: number
  flag?: boolean
  message: string
}

export interface ArticleResponse {
  data: {
    count: number
    records: ArticleItem[] | null
  }
  code: number
  flag?: boolean
  message: string
}

export interface ArticleDetailResponse {
  data: ArticleItem
  code: number
  flag?: boolean
  message: string
}

export interface ArticleState {
  topArticle: TopFeatureArticleItem | {} | null
  featuredArticles: TopFeatureArticleItem[] | null
  articles: []
  categories: []
  archives: []
}

export const useArticleStore = defineStore('articleStore', {
  state: (): ArticleState => {
    return {
      topArticle: {},
      featuredArticles: [],
      articles: [],
      categories: [],
      archives: []
    }
  }
})
