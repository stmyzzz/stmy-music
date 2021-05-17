import Vue from 'vue'
import Vuex from 'vuex'
import {getUserDetail,getUserPlaylist} from '@/api'
import {setStore,removeStore,getStore} from '@/utils'
Vue.use(Vuex)
const UID_KEY = '__uid__'
export default new Vuex.Store({
  state: {
    user:{}, //用户信息
    playLists:[], /* 用户歌单列表 */
    playlistHistory:JSON.parse(getStore('playlistHistory')) || [], /* 用户播放列表 */
    haslogin:false,/* 登录状态 */
    currentSong:{},/* 当前播放的歌曲 */
    playstate:false,/* 当前播放的状态 */
    currentTime:0,  /* 播放的位置 */
    MenuState:true, 
    isPlaylistShow:false /* 播放列表显示 */,
    playMode:getStore('mode') || 'queue'
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
    },
    setCurrentTime(state,time){
      state.currentTime = time
    },
    setMenuState(state,show){
      state.MenuState = show
    },
    /* 设置播放列表 */
    setPlayList(state,playlist){
      let checkrepeat = false
      state.playlistHistory.forEach(song =>{
        if(song.id == playlist.id){
          checkrepeat = true
        }
      })
      if(!checkrepeat){
      state.playlistHistory.push(playlist)
      setStore('playlistHistory',state.playlistHistory)
      }
    },
    setPlayMode(state,mode){
      state.playMode = mode
      setStore('mode',mode)
    },
    setPlayListShow(state,show){
      state.isPlaylistShow = show
    },
    delPlayList(state,index){
      state.playlistHistory.splice(index,1)
      setStore('playlistHistory',state.playlistHistory)
      console.log('currentosng', state.currentSong);
    },
    clearPlayList(state){
      state.playlistHistory = []
      removeStore('playlistHistory')
    }
  },
  actions: {
    async login({commit},uid){
      const error = () => {
        return false
      }
      try {
        const user = await getUserDetail(uid)
        const { profile } = user
        commit('setUser', profile)
        setStore(UID_KEY, profile.userId)
      } catch (e) {
        return error()
      }
      const playlistss = await getUserPlaylist(uid)
      const {playlist} = playlistss
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
