<template>
  <div class="CommondPlayList">
    <Title title="推荐歌单"></Title>
    <div class="playlist_wrap">
      <div class="playlist_card" v-for="(item,index) in CommondPlayList" :key="index">
        <div class="img_wrap">
          <img :src="item.picUrl" alt="">
        </div>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="song_wrap">
    </div>
  </div>
</template>

<script>
import {getCommondPlayList} from '@/api'
export default {
  name:'CommondPlayList',
  data(){
    return {
      CommondPlayList:[],
      limitItem : 5,
    }
  },
  mounted(){
    this.initData()
  },
  computed:{
  },
  methods:{
      async initData(){
      let res = await getCommondPlayList()
      this.CommondPlayList = res.data.result
      console.log(this.CommondPlayList)
    },

  }
}
</script>

<style lang="scss" scoped>
  .playlist_wrap{
    display: flex;
    flex-wrap: wrap;
    .playlist_card{
      color: var(--font-color);
      margin: 0 .5rem;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      width: calc(20% - 1rem);
      cursor: pointer;
      img{
        width: 100%;
      }
      p{
        margin-top: .3rem;
        font-size: 13px;
      }
    }
  }
</style>