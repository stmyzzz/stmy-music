import {request} from '@/utils'

/* 发现页轮播图 */
export const getBanner = () =>  request.get('/banner')

export const getNewSong = () => request.get('/personalized/newsong')

export const getCommondPlayList = () =>request.get('/personalized')

export const getCommondMv = () =>request.get('/personalized/mv')