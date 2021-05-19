<template>
  <div class="menu" v-show="MenuState">
    <div class="user">
      <User />
    </div>
    <div class="menu_wrap">
      <ul class="menu_list">
        <router-link active-class="menu_active" tag="li" v-for="(item,index) in menuRoutes" :key="index" :to="item.path" >
          <Icon :size="16" :type="item.meta.icon" class="iconfont"  />
          <span class="menu_title">{{item.meta.title}}</span>
        </router-link>
      </ul>   
      <div class="user_Menu" v-for="(item,index) in userMenus" :key="index"> 
        <p>
          <span class="usermenu_header">{{item.title}}</span>
        </p>
        <ul class="menu_list">
        <router-link active-class="menu_active" tag="li" v-for="(list,index) in item.children" :key="index" :to="list.path" >
          <Icon :size="16" :type="list.meta.icon" class="iconfont"  />
          <span class="menu_title">{{list.meta.title}}</span>
        </router-link>
      </ul> 
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/components/user'
import {menuRoutes} from '@/router'
import {mapGetters} from 'vuex'
import Icon from '../base/Icon.vue'
import {mapState} from 'vuex'
export default {
  data(){
    return {
      menuRoutes:menuRoutes

    }
  },
  computed:{
    ...mapGetters(['userMenus']),
    ...mapState(['MenuState'])
  },
  components:{
    User,
    Icon
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu{
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: var(--menu-bgcolor);
    margin-bottom: $mini-player-height;
    .menu_wrap{
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
      .menu_list{
        li{
          font-size: 13px;
          display: flex;
          align-items: center;
          .menu_title{
            margin-left: 6px;
            @include text-ellipsis();
          }
          color: var(--font-color);
          padding: 15px 20px;
          cursor: pointer;
          &:hover{
            background-color: var(--menu-item-hover-bg);
          }
        }
        .menu_active{
          color: $theme-color;
          background: var(--menu-item-active-bg)
        }

      }
      .user_Menu{
        p{
          padding: 15px 20px;
          font-size: 13px;  
          color: var(--font-color-grey2);        
        }

        
      }
    }
  }
</style>