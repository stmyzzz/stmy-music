<template>
  <div class="searchMvs">
    <div class="mv-card">
      <MvCard :mvData="mvs" >
      </MvCard>        
    </div>
    <!-- 组件封装 -->
    <Pagination :limit="28" @getListData="getSearchMv"
    :getParams="getParams" 
    :getData="SearchDetail" > 
    </Pagination>
  </div>
</template>

<script>
import {SearchDetail} from '@/api'
import MvCard from '../newmv/MvCard'
import Pagination from '@/components/pagination'
export default {
  components: { Pagination,MvCard },
  inject:['searchData'],
  data(){
    return {
      mvs:[],
      currentPage:0,
      mvCount:0
    }
  },
  created(){
    this.SearchDetail = SearchDetail
  },
  methods:{
  getSearchMv(res){
      console.log('resss12',res);
      const {result:{mvs,mvCount}} = res
    this.mvs = mvs
    this.mvCount = mvCount
    console.log('mvcount',mvCount);
    this.searchData.onUpdateCount(mvCount)
    this.searchData.resultName = "MV"
  },
  },
  computed:{
    getParams(){
      return {
        keywords:this.searchData.keyword,
        type:1004,
      }
    }
  }


}
</script>

<style lang="scss" scoped>
  .mv-card{
    margin: 10px 10px;
  }
</style>