import Vue from 'vue'
import VueRouter from 'vue-router'

const Found = () => import(/* webpackChunkName: "Found" */ '@/views/found')
const Newmusic = () => import(/* webpackChunkName: "Newmusic" */ '@/views/newmusic')
const NewMv = () => import(/* webpackChunkName: "NewMv" */ '@/views/newmv')
const Playlists = () => import(/* webpackChunkName: "Playlists" */ '@/views/playlists')
const Mv = () => import(/* webpackChunkName: "Mv" */ '@/views/mv')
const search = () => import(/* webpackChunkName: "search" */ '@/views/search')
const searchSongs = () => import(/* webpackChunkName: "searchSongs" */ '@/views/search/searchSongs')
const searchPlaylists = () => import(/* webpackChunkName: "searchPlaylists" */ '@/views/search/searchPlaylists')
const searchMvs = () => import(/* webpackChunkName: "searchMvs" */ '@/views/search/searchMvs')
const playlist = () => import(/* webpackChunkName: "playlist" */ '@/views/playlist')
const mv = () => import(/* webpackChunkName: "mv" */ '@/views/mv')
Vue.use(VueRouter)

/* 侧边栏菜单页面 */
export const menuRoutes = [
  {
    path:'/found',
    name:'found',
    component:Found,
    meta:{
      title:'发现音乐',
      icon:'music'
    }
  },
  {
    path:'/playlists',
    name:'playlists',
    component:Playlists,
    meta:{
      title:'推荐歌单',
      icon:'playlist-menu'
    }
  },
  {
    path:'/newmusic',
    name:'newmusic',
    component:Newmusic,
    meta:{
      title:'最新音乐',
      icon:'yinyue'
    }
  },
  {
    path:'/newmv',
    name:'NewMv',
    component:NewMv,
    meta:{
      title:'最新MV',
      icon:'mv'
    }
  }
]

const routes = [
  {
    path:'/',
    redirect:'/found'
  },
  {
    path:'/found',
    name:'found',
    component:Found
  },
  {
    path:'/playlists',
    name:'playlists',
    component:Playlists
  },
  {
    path:'/newmusic',
    name:'Newmusic',
    component:Newmusic
  },
  {
    path:'/newmv',
    name:'NewMv',
    component:NewMv
  },
  {
    path:'/mv:id',
    name:'Mv',
    component:Mv
  },
  {
    path:'/search/:keyword',
    name:'search',
    component:search,
    props:true, /* 通过路由组件传递props */
    children:[
      {
        path:'/',
        redirect:'songs'
      },
      {
        path:'songs',
        name:'searchSongs',
        component:searchSongs
      },
      {
        path: 'playlists',
        name: 'searchPlaylists',
        component: searchPlaylists,
      },
      {
        path: 'mvs',
        name: 'searchMvs',
        component: searchMvs,
      }

    ]
  },
  {
    path:'/playlist/:id',
    name:'playlist',
    component:playlist
  },
  {
    path:'/mv/:id',
    name:'mv',
    component:mv
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
