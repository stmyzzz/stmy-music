<template>
  <div class="searchplaylists">
    <PlaylistCard :playlist="playlists" >
    </PlaylistCard>   
    <!-- 组件封装 -->
    <Pagination :limit="30" @getListData="getSearchMv"
    :getParams="getParams" 
    :getData="SearchDetail" > 
    </Pagination>
  </div>
</template>

<script>
import {SearchDetail} from '@/api'
import PlaylistCard from '../playlists/PlayListCard'
import Pagination from '@/components/pagination'
export default {
  components: { Pagination,PlaylistCard },
  inject:['searchData'],
  data(){
    return {
      playlists:[],
      currentPage:0,
      playlistCount:0
    }
  },
  created(){
    this.SearchDetail = SearchDetail
    this.initData()
  },
  methods:{
    async initData(){ 
      this.getSearchMv()  
    },
  getSearchMv(res){
      console.log('resss12',res);
      const {result:{playlists,playlistCount}} = res
    this.playlists = playlists
    this.playlistCount = playlistCount
    this.searchData.onUpdateCount(playlistCount)
    this.searchData.resultName = "歌单"
  },
  },
  computed:{
    getParams(){
      return {
        keywords:this.searchData.keyword,
        type:1000,
      }
    }
  }


}
</script>

<style lang="scss" scoped>
  .searchplaylists{
    margin: 10px;
  }
</style>