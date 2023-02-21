import { http } from '../utils'

const UPLOAD_URL = '/upload/file'

export const uploadFile = (param: FormData) => {
  return http.post(UPLOAD_URL, { file: param })
}
