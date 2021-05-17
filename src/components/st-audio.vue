<template>
  <div class="st-audio">
        <audio ref="audio" class="audio"
        :src="url"
        @play="onPlay"
        @timeupdate="upDateTime" >
        </audio>
        <div class="btns">
          <el-slider class="CurrentTime"  
          v-model="PlayTime"></el-slider>
          <Icon class="icon" style="width:100px;height:100px" @click="startPlay" type="play" :size="60">
          </Icon>
          </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      PlayTime:0,
      playState:true,
      audio:{
        currentTime:0,
        maxTime:0
      }
    }
  },
  props:{
    url:{
      type:String,
      default:''
    }
  },
  mounted(){  
  },
  methods:{
    upDateTime(res){
      console.log('currentTime',res.target.currentTime);
      this.audio.currentTime = res.target.currentTime
      this.audio.maxTime = parseInt(res.target.duration)
      this.PlayTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      console.log(this.PlayTime);
    },
    startPlay() {
      this.$refs.audio.play()
    },
    pausePlay() {
      this.$refs.audio.pause()
    },
    onPlay(){
      if(this.playState){
        this.pausePlay()
        this.playState = false
      }else{
        this.startPlay()
        this.playState = true
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .st-audio{
    height: 100px;
  }
</style>