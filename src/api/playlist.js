import {request} from '@/utils'

/* 精选歌单头 */
export const getTopPlayList = (params) => request.get('/top/playlist',{params})

/* 推荐歌单  */
export const getPlayList = (params) => request.get('/top/playlist',{params})

/* 获取精品歌单标签列表 */
export const getTagList = () => request.get('/playlist/highquality/tags')

/* 歌单详情 */
export const getPlaylistDetail = (id) => request.get('/playlist/detail',{
  params:{
    id
  }
})

