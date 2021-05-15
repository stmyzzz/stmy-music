import axios from 'axios'
import { showConfirm } from "@/base/confirm";
const BASE_URL = 'http://localhost:3000'

/* 自定义axios 创建一个axios实例 */
export const request = createBaseInstance()
function createBaseInstance(){
  const instance = axios.create({
    baseURL: BASE_URL,
  })
  instance.interceptors.response.use(handleResponse,handleError);
  return instance
}
function handleResponse(response){
  return response.data
}
function handleError(e){
  showConfirm(e.message, "出错啦！");
  console.log('404');
  throw e;
}