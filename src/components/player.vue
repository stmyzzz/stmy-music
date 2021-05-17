<template>
  <div  class="player" ref="player">
    <audio ref="audio" class="audio" controls="controls" @play="onplay" 
    @ended="PlayEnd" autoplay="autoplay"
        :src="currentSong.url">
    </audio>
    <span>上一首歌</span>
    <span>下一首歌</span>
    <span  
    @onended="PlayEnd"
    @click="hasDrawer">播放列表</span>
      <el-popover
    placement="top-start"
    :content="currentMode.name"
    width="50"
    trigger="hover">
    <Icon :type="currentMode.icon" slot="reference" @click="changeMode">
      {{currentMode.name}}</Icon>
      </el-popover>
      <now-Playlist v-show="isPlaylistShow"></now-Playlist>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getStore} from '@/utils'
import nowPlaylist from '@/components/nowplaylist'
const playModeMap = {
  queue:{
    code:'queue',
    icon:'sequence',
    name:'顺序播放'
  },
  loop: {
    code: 'loop',
    icon: 'loop',
    name: '单曲循环'
  },
  random: {
    code: 'random',
    icon: 'random',
    name: '随机播放'
  },
}
export default {
  name:'player',
  data(){
    return {
      Time:0,
      isDrawer:false,
      currentMode:{},
      playMode:getStore('mode') || 'loop',
    }
  },
  components:{
    nowPlaylist
  },
  created(){
    this.currentMode = playModeMap[this.playMode]
    this.setPlayMode(this.playMode)
  },
  computed:{
    ...mapState(["currentSong","playstate","currentTime","isPlaylistShow","playlistHistory"]),
    changeTime(){
        const { durationSecond } = this.currentSong
        return Math.min((this.currentTime / durationSecond)*100, 100) || 0 
    },
  },
  mounted(){
    if(this.playMode == 'loop'){
      this.$refs.audio.setAttribute('loop','loop')
    }
    window.addEventListener('click', this.otherClose)
  },
  beforeDestroy() {
    /* 组件销毁的时候要移除侦听器 */
    window.removeEventListener('click', this.otherClose)
  },
  methods:{
    PlayEnd(){
      if(this.playMode == 'queue'){
        this.CurrentIndex = this.playlistHistory.findIndex((value) =>{
          console.log(value.id);
          return value.id == this.currentSong.id
        })
        console.log('CurrentIndex',this.CurrentIndex);
        this.lastIndex = this.CurrentIndex+1
        if(this.lastIndex == this.playlistHistory.length){
          this.lastIndex = 0
        }
        this.setCurrentSong(this.playlistHistory[this.lastIndex]) 
      }else if(this.playMode == 'random'){
        this.RandomSong = parseInt(Math.random()*this.playlistHistory.length - 1) 
        this.setCurrentSong(this.playlistHistory[this.RandomSong]) 
      }
    },
    ...mapMutations(['setCurrentTime','setPlayMode','setPlayListShow','setCurrentSong']),
    otherClose(e){
      console.log('this.$refs.player',this.$refs.player.contains(e.target));
      if(!this.$refs.player.contains(e.target)) this.setPlayListShow(false)
    },
    updateTime(e){
      const time = e.target.currentTime
      this.setCurrentTime(time)
    },
    changeTimee(time){
      console.log('time',time);
    },
    onplay(){
      console.log('play');
    },
    hasDrawer(){
      this.setPlayListShow(!this.isPlaylistShow)
    },
    changeMode(){
      if(this.playMode == 'loop'){
        this.playMode = 'queue'
        this.$refs.audio.removeAttribute('loop')
      }else if(this.playMode == 'random'){
        this.playMode = 'loop'
        this.$refs.audio.removeAttribute('loop')
      }else if(this.playMode == 'queue'){
        this.playMode = 'random'
        this.$refs.audio.setAttribute('loop','loop')
      }
      console.log(this.playMode);
      this.currentMode = playModeMap[this.playMode]
      this.setPlayMode(this.playMode)
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
    background:var(--body-bgcolor);
    z-index: 100;
    .audio{
      width:50%;
    }
    audio::-webkit-media-controls-panel{
      background-color: #fff;
    }
    
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