import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/layout/header.vue'

const Found = () => import(/* webpackChunkName: "Found" */ '@/views/found')
const Newmusic = () => import(/* webpackChunkName: "Newmusic" */ '@/views/newmusic')
const Newmv = () => import(/* webpackChunkName: "Newmv" */ '@/views/newmv')
const Playlists = () => import(/* webpackChunkName: "Playlists" */ '@/views/playlists')
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
    name:'newmv',
    component:Newmv,
    meta:{
      title:'最新MV',
      icon:'mv'
    }
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
