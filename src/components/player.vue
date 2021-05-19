<template>
  <div  class="player" ref="player">
    <div class="img-wrap" @click="hasPlayer" >
      <img :src="currentSong.img" alt="">
    </div>
    <player-panel :currentTime="currentTime"   :drawer.sync="drawer" ></player-panel>
    <div class="song-wrap">
      <span>{{currentSong.name}} - </span>
      <span>{{currentSong.artistsText}}</span>
    </div>
    <audio ref="audio" class="audio" controls="controls" @play="onplay" 
    @pause="onpause"
    @ended="PlayEnd" autoplay="autoplay"
        :src="currentSong.url"
        @timeupdate="updateTime">
    </audio>
    <span @click="preSong">上一首歌</span>
    <span @click="nextSong" >下一首歌</span>
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
import PlayerPanel from '@/components/playerpanel'
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
      drawer:false,
      currentMode:{},
      playMode:getStore('mode') || 'loop'
    }
  },
  components:{
    nowPlaylist,
    PlayerPanel
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
    preSong(){
      console.log('dangqian',this.currentSong);
      this.CurrentIndex = this.playlistHistory.findIndex((value) =>{
        console.log('当前歌曲的索引',value.id);
        return value.id == this.currentSong.id
      })
      console.log('当前歌曲的索引',this.CurrentIndex);
      if(this.CurrentIndex == 0){
        this.preIndex = this.playlistHistory.length - 1
      }else{
        this.preIndex = this.CurrentIndex - 1       
      }
      this.setCurrentSong(this.playlistHistory[this.preIndex])
    },
    nextSong(){
      console.log('dangqian',this.currentSong);
      this.CurrentIndex = this.playlistHistory.findIndex((value) =>{
        console.log('当前歌曲的索引',value.id);
        return value.id == this.currentSong.id
      })
      console.log('当前歌曲的索引',this.CurrentIndex);
      if(this.CurrentIndex ==  this.playlistHistory.length - 1  ){
        this.nextIndex =0
      }else{
        this.nextIndex = this.CurrentIndex + 1       
      }
      this.setCurrentSong(this.playlistHistory[this.nextIndex])
    },
    ...mapMutations(['setCurrentTime','setPlayMode','setPlayListShow','setCurrentSong','setPlayState']),
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
      this.setPlayState(true)
    },
    onpause(){
      this.setPlayState(false)
    },
    hasDrawer(){
      this.setPlayListShow(!this.isPlaylistShow)
    },
    hasPlayer(){
      this.drawer = !this.drawer
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
    },
  },
  watch:{
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
    padding: 0px 100px;
    display: flex;
    align-items: center;
    .img-wrap{
      width: 45px;
      height: 45px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .song-wrap{
      margin-left: 20px;
    }
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
     
      ::-webkit-scrollbar {
            width: 0px;
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