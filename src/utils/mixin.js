/* 控制菜单是否隐藏 */

import store from "../store"

export const MenuControl = {
  created(){
    store.commit('setMenuState',false)
  },
  beforeDestroy(){
    console.log('销毁了');
    store.commit('setMenuState',true)
  }
}