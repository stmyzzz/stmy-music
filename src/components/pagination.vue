<template>
  <div class="el-page" v-if="total > limit">
    <el-pagination
      :background="true"
      :current-page.sync="currentPage"
      :page-size="limit"
      :total="total"
      @current-change="onPageChange"
      layout="prev, pager, next"
        >
    </el-pagination> 
  </div>
</template>

<script>
import {getPageOffset} from '@/utils'
export default {
  props:{
    limit:{
      type:Number,
      default:0
    },
    getData:{
      type:Function,
      default:() => {}
    },
    getParams:{
      type:Object,
      default:() =>{}
    }
  },
  name:'Pagination',
  data(){
    return {
      currentPage : 0,
      total:100
    }
  },
  mounted(){
    this.onPageChange(this.currentPage)
  },
  methods:{
    async onPageChange(page){
      this.currentPage = page
        console.log('thisgetData',this.getData);
        let res = await this.getData({
        limit:this.limit,
        offset:getPageOffset(this.currentPage,this.limit),
        ...this.getParams
      }) 
      console.log('baseres',res);
      if(res.result.songCount){
        this.total = res.result.songCount        
      }else if(res.result.playlistCount){
        this.total = res.result.playlistCount 
      }else if(res.result.mvCount){
        this.total = res.result.mvCount 
      }

      this.$emit('getListData',res)
    }
  },
  watch:{
    getParams:{
      deep:true,
      handler(){
        this.currentPage = 1
        this.onPageChange(this.currentPage)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .el-page{
    padding: 50px 0;
    padding-right: 10px;
  }
</style>