import {request} from '@/utils'

/* 获取所有的MV 按分类 */
export const MvAll = (params) => request.get('/mv/all',{params})

/* 获取mv详情 */
export const getMvDetail = id => request.get(`/mv/detail?mvid=${id}`)

/* 获取相似mv */
export const getSimiMv = id => request.get(`/simi/mv?mvid=${id}`)

/* 得到mv播放地址 */
export const getMvUrl = id => request.get(`/mv/url?id=${id}`)