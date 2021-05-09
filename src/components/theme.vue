<template>
  <div class="theme_container">
    <el-popover placement="top"
      width="230"
      trigger="click">
      <div class="themes_content">
        <div v-for="(themevalue,themekey,themeindex) in thememap" :key="themeindex" class="theme_item" @click="changeTheme(themekey)">
          <div :style="themevalue.style" class="theme-icon" ></div>
          <p>{{themevalue.title}}</p>
        </div>
      </div>
      <Icon 
        :backdrop="true"
        slot="reference"
        type="skin"
      />
    </el-popover>
  </div>
</template>

<script>
import {dark,white,red} from '@/style/theme'
import {setStore,getStore} from '@/utils/storage'
const THEME_KEY = "theme"  /* 缓存主题的key */
const themes = {
  white: "white",
  dark: "dark",
  red: "red"
}
export default {
  name:'theme',
  data(){
    return {
      thememap:{}
    }
  },
  created(){
    this.thememap = {
      [themes.dark]:{
        title:'深色 ',
        file:dark,
        style:{
          backgroundColor:"#202020"
        }
      },
      [themes.white]:{
        title:'浅色',
        file:white,
        style:{
          backgroundColor:"#F6F6F6"
        }
      },
      [themes.red]:{
        title:'红色 ',
        file:red,
        style:{
          backgroundColor:"#D33A31"
        }
      }
    }
    if(getStore(THEME_KEY)){
    this.changeTheme(getStore(THEME_KEY))      
    }else{
      this.changeTheme(themes.white)
    }

  },
  methods:{
    changeTheme(themekey){
      setStore(THEME_KEY,themekey)
      const theme = this.thememap[themekey].file
      Object.keys(theme).forEach(key =>{
        const value = theme[key]
        document.documentElement.style.setProperty(key,value)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .themes_content{
    @include fc;
    justify-content: center;
    .theme_item{
      @include fc;
      flex-direction: column;
      margin: 0 8px;
      cursor: pointer;
      .theme-icon{
        @include wh(25px,25px);
        border-radius: 50%;
        margin-bottom: 5px;
      }
    }
  }
</style>