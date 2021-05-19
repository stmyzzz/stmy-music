import {request} from '@/utils'

/* 新歌速递 */
export const getTopSongs = type =>request.get(`/top/song?type=${type}`)

/* 歌曲详情 */
export const getSongDetail = ids =>request.get(`/song/detail?ids=${ids}`)

/* 歌曲如果没有封面 调用获取专辑封面 */
export const getAlbumImg = id => request.get(`/album?id=${id}`)

/* 获取歌词 */
export const getlyric = id => request.get(`/lyric?id=${id}`)

/* 获取相似音乐 */
export const getSimiSong = id =>request.get(`/simi/song?id=${id}`)
