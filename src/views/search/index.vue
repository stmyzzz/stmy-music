<template>
<div class="index">
  <div class="search-header">
    <p>搜索<span class="keyword">{{keyword}}</span>找到{{count}}个{{resultName}}</p>    
  </div>
  <div class="typeTabs">
    <search-tab :tabs="tabs" @tabChange="tabChange" ></search-tab>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import SearchTab from './searchTabs'
const tabs = [
  {
    title: "歌曲",
    key: "songs",
    to: "songs"
  },
  {
    title: "歌单",
    key: "playlists",
    to: "playlists"
  },
  {
    title: "MV",
    key: "mvs",
    to: "mvs"
  },
]
export default {
  name:'search',
  props:['keyword'],
  provide(){
    return {
      searchData : this
    }
  },
  components:{
    SearchTab
  },
  data(){
    return {
      count:0,
      resultName:''
    }
  },
  created(){
    this.tabs = tabs
    let param = this.$route.params
    console.log('param',param);
  },
  methods:{
    tabChange(){
      console.log('123');
    },
    onUpdateCount(count){
      this.count = count
    }
  }
}
</script>

<style lang="scss" scoped>
  .typeTabs{
    margin: 30px 0;
  }
  .search-header{
    margin: 20px 28px;
    p{
      color:var(--font-color-grey-shallow);
      font-size: 13px;
      letter-spacing: .05rem;
      .keyword{
        color: black;
        margin: 0 .3rem;
        font-weight: 700;
        font-size: 30px;
      }
    }
  }
</style>