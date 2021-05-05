<template>
  <div class="menu">
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
    </div>
  </div>
</template>

<script>
import User from '@/components/user'
import {menuRoutes} from '@/router'
export default {
  data(){
    return {
      menuRoutes:menuRoutes

    }
  },
  components:{
    User
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
    height: 100%;
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
    }
  }
</style>