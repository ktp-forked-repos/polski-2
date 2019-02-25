import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}

export const get = (url: string) => axios.get(url, { headers })
export const post = (url: string, data: object) => axios.post(url, data, { headers })
export const put = (url: string, data: object) => axios.post(url, data, { headers })

export default {
  get,
  post,
  put
}
