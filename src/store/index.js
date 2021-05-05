import Vue from 'vue'
import Vuex from 'vuex'
import {getUserDetail} from '@/api'
import {setStore} from '@/utils'

Vue.use(Vuex)
const UID_KEY = '__uid__'
export default new Vuex.Store({
  state: {
    user:{},
    playLists:{},
    haslogin:false
  },
  mutations: {
    setUser(state,user){
      state.user = user
    }
  },
  actions: {
    async login({commit},uid){
      
      const user = await getUserDetail(uid)
      console.log('vuex',user)
      const {profile} = user.data
      if(profile){
        commit('setUser',profile)
        setStore(UID_KEY,profile.userId)
        return true
      }else{
        return false
      }

    }
  },
  modules: {
  }
})
