import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

/* 自定义axios 创建一个axios实例 */
export const request = createaxios()
function createaxios(){
  const instance = axios.create({
    baseURL: BASE_URL,
  })
  axios.interceptors.response.use(handleResponse,handleError);
  return instance
}
function handleResponse(response){
  return response.data
  
}
function handleError(e){
  confirm(e.message,"出错了！")
  throw e
}