<template>
  <div class="player">
    <div class="progress">
      <el-slider v-model="value3" :show-tooltip="false"></el-slider>
    </div>
    <div class="song">
      <div class="img_wrap">
        <img :src="currentSong.img" alt="">
      </div>
      <div class="content">
        <div class="top">
          <span> {{currentSong.name}}</span>
          <span>- {{currentSong.artistsText}}</span>
          </div>
        <div class="time"></div>
      </div>  <audio autoplay="autoplay" :src="currentSong.url">
    </audio>
    </div>
  
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'player',
  data(){
    return {

    }
  },
  computed:{
    ...mapState(["currentSong","playstate"]),
  },
  created(){
    
  },
  methods:{

  }


}
</script>

<style lang="scss" scoped>
  .player{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    height:60px;
    background:var(--body-bgcolor);
    .img_wrap{
      img{
        width:40px;
        height:40px;
      }
    }
    .song{
      display: flex;
      align-items: center;
      
    }
  }
</style>