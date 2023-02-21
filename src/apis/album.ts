import { http } from '@/utils'

const URLS = {
  ALBUMS_LIST: '/api/photos/albums'
}

export interface AlbumItem {
  albumCover: string | null
  albumDesc: string
  albumName: string
  id: number
}

export interface AlbumResponse {
  code: number
  data: AlbumItem[] | null
  flag?: boolean
  message: string
}

export interface PhotoItem {
  photoAlbumCover: string | null
  photoAlbumName: string
  photos: string[]
}
export interface PhotoResponse {
  code: number
  data: PhotoItem | null
  flag?: boolean
  message: string
}

export const getAlbumsList = () => {
  return http.get(URLS.ALBUMS_LIST)
}

export const getPhotosByAlbumId = (albumId: number, params: any) => {
  return http.get('/api/albums/' + albumId + '/photos', {
    query: params
  })
}
