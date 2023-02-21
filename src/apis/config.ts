import { http } from '@/utils/http'

export const getWebsiteConfig = () => {
  return http.get('/api/')
}
