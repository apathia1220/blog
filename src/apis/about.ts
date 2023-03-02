import { http } from '@/utils'

const URLS = {
  ABOUT: '/api/about'
}

export interface AboutResponse { 
    code: number
    data: {
        content: string
    }
    flag?: boolean
    message: string
}

export const getAbout = () => {
    return http.get(URLS.ABOUT)
}