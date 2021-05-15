import {request} from '@/utils'
/* 获取歌单评论 */
export const getPlaylistComment = params => request.get('/comment/playlist',{params})

/* 获取最热评论 */
export const getHotComment = params => request.get('/comment/hot',{params})

/* 获取音乐评论 */
export const getMusicComment = params => request.get('/comment/music',{params})

/* 获取mv评论 */
export const getMvComment = params => request.get('/comment/mv',{params})