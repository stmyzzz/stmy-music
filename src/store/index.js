import Vue from 'vue'
import Vuex from 'vuex'
import {getUserDetail,getUserPlaylist} from '@/api'
import {setStore,removeStore} from '@/utils'

Vue.use(Vuex)
const UID_KEY = '__uid__'
export default new Vuex.Store({
  state: {
    user:{},
    playLists:[],
    haslogin:false,
    currentSong:{},
    playstate:false,
    playHistory:[]
  },
  mutations: {
    setUser(state,user){
      state.user = user
    },
    setUserPlaylist(state,playlist){
      state.playLists = playlist
    },
    setCurrentSong(state,song){
      state.currentSong = song
    },
    setPlayState(state,playstate){
      state.playstate = playstate
    }
  },
  actions: {
    async login({commit},uid){
      const error = () => {
        return false
      }
      try {
        const user = await getUserDetail(uid)
        const { profile } = user.data
        commit('setUser', profile)
        setStore(UID_KEY, profile.userId)
      } catch (e) {
        return error()
      }
      const playlistss = await getUserPlaylist(uid)
      const {playlist} = playlistss.data
      commit('setUserPlaylist',playlist)
      return true
    },
    logout ({commit}){
      console.log('logout');
      commit('setUser',{})
      commit('setUserPlaylist',{})
      removeStore(UID_KEY)
    },
    async startSong({commit},song){
      commit('setCurrentSong',song)
      commit('setPlayState',true)

    }
  },
  getters:{
    haslogin:(state)=>{
      if(state.user.userId){
        return true
      }else{
        return false
      }
    },
  userMenus : (state) =>{
      const {user,playLists} = state
      const setMenus = []
      const userCreateList = []
      const userCollectList = []
      console.log(playLists);
      playLists.forEach(playlist => {
        const {userId} = playlist
        if(user.userId === userId){
          userCreateList.push(playlist)
        }else{
          userCollectList.push(playlist)
        }
      });
      
      const toplaylist = (playlist) =>
        playlist.map(({id, name}) =>({
          path:`/playlist/${id}`,
          meta:{
            title:name,
            icon:'playlist-menu'
          },
        }))
      
      if(userCreateList.length){
        setMenus.push({
          type:'playlist',
          title:'创建的歌单',
          children:toplaylist(userCreateList)
        })
      }
      if(userCollectList.length){
        setMenus.push({
          type:'playlist',
          title:'收藏的歌单',
          children:toplaylist(userCollectList)
        })
      }
      return setMenus
    }
  }
})
