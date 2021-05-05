import {request} from '@/utils'

/* 热搜列表(简略) */
export const getSearchHot = () => request.get('/search/hot')

/* 搜索 */
export const Search = (keywords) => request.get('/search/suggest',{
  params:{
    keywords
  }
})
