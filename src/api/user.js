import {request} from '@/utils'

/* 根据id获取用户信息 */
export const getUserDetail = (uid) =>request.get('/user/detail',{
  params:{
    uid
  }
})

/* 根据id获取用户歌单 */
const LIMIT_PAGE = 30
export const getUserPlaylist = (uid) => request.get('/user/playlist',{
  params:{
    uid,
    LIMIT_PAGE
  }
})