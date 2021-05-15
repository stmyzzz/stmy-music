<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
      <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {getBanner} from '@/api'
export default {
  data(){
    return{
      banners:{}
    }
  },
  methods:{
    async initData(){
      let res = await getBanner()
      this.banners = res.banners
      console.log(res)
    }
  },
  mounted(){
    this.initData()
  }

}
</script>

<style lang="scss" scoped>
  .banner{
    margin: 20px 0;
  }
  .el-carousel__item img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
</style>