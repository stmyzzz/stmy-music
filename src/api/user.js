import {request} from '@/utils'

/* 根据id获取用户信息 */
export const getUserDetail = (uid) =>request.get('/user/detail',{
  params:{
    uid
  }
})