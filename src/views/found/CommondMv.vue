<template>
  <div class="commondMv">
    <Title title="推荐MV"></Title>
    <ul class="mv_list">
      <li class="list_item" v-for="(item,index) in mvList" :key="index">
        <div class="img_wrap">
          <img v-lazy="item.picUrl+'?params=500y260'" alt="">          
        </div>
        <p class="mv_name">{{item.name}}</p>
        <p class="mv_artist">{{item.artistName}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getCommondMv} from '@/api'
export default {
  data(){
    return {
      mvList:[]
    }
  },
  created(){
    this.initData()
  },
  methods:{
    async initData(){
      let newMv = await getCommondMv()
      this.mvList = newMv.result
      console.log('newmv',this.mvList);
    }
  }

}
</script>

<style lang="scss" scoped>
  .mv_list{
    display: flex;
    align-items: center;
    .list_item{
      display: flex;
      flex-direction: column;
      width: 25%;
      padding: 0 .6rem;
      margin-bottom: 50px;
      .img_wrap{
        width: 100%;
        height: 140px;
        
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .mv_name{
        @include text-ellipsis();
        font-size: $font-size-sm;
        margin-top: 5px;
      }
      .mv_artist{
        margin-top: 5px;
        font-size: $font-size-sm;
        color: var(--font-color-grey-shallow);
      }
    }
  }
</style>