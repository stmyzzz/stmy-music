<template>
  <div class="index">
    <layout-header></layout-header>
    <div class="index-body">    
      <layout-menu></layout-menu> 
      <div class="content">
      <router-view></router-view>        
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from '@/layout/header'
import LayoutMenu from '@/layout/menu'
export default {
  name:'index',
  components:{
    LayoutHeader,
    LayoutMenu
  }
}
</script>

<style lang="scss" scoped>
  .index{
    height: 100%;
    .index-body{
      display: flex;
      padding-top: $header-height;
      height: 100%;
    }   
    .content{
      flex: 1;
      overflow-y: auto; 
      margin-bottom: $mini-player-height;
    }  
  }

</style>