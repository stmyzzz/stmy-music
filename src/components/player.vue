<template>
  <div class="player">
    <div class="progress">
      <el-progress :show-text="false" :percentage="changeTime"></el-progress>
    </div>
    <div class="player_content">
      <div class="song">
        <div class="img_wrap">
          <img :src="currentSong.img" alt="">
        </div>
        <div class="content">
          <div class="top">
            <span> {{currentSong.name}}</span>
            <span>- {{currentSong.artistsText}}</span>
            </div>
          <div class="time">
            <span class="currentTime">{{$utils.numDate(currentTime)}}</span>
            <span> / </span>
            <span class="totalTime">{{currentSong.durationSecond}}</span>
          </div>
        </div>  

      </div> 
      <div class="control">
        <Icon :size="24"  class="icon" type="prev" />
        <i class="el-icon-caret-right icon"></i>
        <Icon :size="24"  class="icon" type="next" />
      </div> 
      <div class="mode">
        
      </div>        
    </div>
    <audio autoplay="autoplay" 
        @timeupdate="updateTime" 
        :src="currentSong.url">
    </audio>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'player',
  data(){
    return {
      Time:0
    }
  },
  computed:{
    ...mapState(["currentSong","playstate","currentTime"]),
    changeTime(){
        const { durationSecond } = this.currentSong
        return Math.min((this.currentTime / durationSecond)*100, 100) || 0 
    },
    
  },
  created(){
    
  },
  methods:{
    ...mapMutations(['setCurrentTime']),
    updateTime(e){
      const time = e.target.currentTime
      this.setCurrentTime(time)
    },
    changeTimee(time){
      console.log('time',time);
    }

  }


}
</script>

<style lang="scss" scoped>
  .player{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    height:70px;
    background:var(--body-bgcolor);
    .player_content{
      display: flex;
      .song{
      flex: 4;
      display: flex;
      align-items: center;
      padding: 7px 50px;
      .img_wrap{
        img{
          width:45px;
          height:45px;
          border-radius: 5px;
        }
      }
      .content{
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .top{
          margin-bottom: 5px;
        }
      }
    }
    .control{
      flex: 2;
      color: red;
      .icon{
        font-size: 40px !important;
      }
    }     
    .mode{
      flex: 5;
    }   
    
    }
  }
</style>