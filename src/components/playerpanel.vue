<template>
  <div class="playerpanel">
  <div class="drawer" v-show="drawer" >
    <div class="drawer-song"> 
      <div class="img-wrap">
        <img class="roImg" ref="roImg" :src="currentSong.img" alt="">
        <img ref="imgBar" class="img-bar" src="@/assets/play-bar.png" alt="">
      </div>
      <div class="song-wrap">
        <div class="song-header">
          <h1 class="header-name">{{currentSong.name}}</h1>
          <p class="header-artist">{{currentSong.artistsText}}</p>
        </div>
        <div class="song-content" ref="wrapper" >
          <ul class="contentplayer" ref="content">
            <li :class="{ 'active' : geticy[index].time < current && geticy[index+1].time > current}" v-for="(word,index) in geticy" :key="index">{{word.lysic}}
              {{scroller(index)}}</li>          
          </ul>
        </div>
      </div>
    </div>
    <!--   <div class="drawer-content">
        <div class="song-wrap">
          <div class="img-wrap">
            <img :src="currentSong.img" alt="">
          </div>
          <div class="list-wrap">
            <li @click="goSimiSong(list)" class="list-item" v-for="(list,index) in SimiSong" :key="index" >
              <div class="list-img">
                <img :src="list.img" alt="">
              </div>
              <div class="list-content">
                
              </div>
            </li>
          </div>
        </div>
      </div>    -->   
  </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {getlyric,getSimiSong} from '@/api'
import {getLysic} from '@/utils'
import {createSong} from '@/utils'
export default {
  data(){
    return{
      lysicArr:[],
      currentlysic:"",
      SimiSong:[]
    }
  },
  props:{
    drawer:{
      type:Boolean,
      default:false
    }
  },
  created(){
    if(this.currentSong.id){
      this.getword()      
      this.getSimiSong()
    }
  },
  methods:{
    ...mapActions(["startSong"]),
    closeDrawer(){
      this.$emit('update:drawer',false)
    },
    async getword(){ 
      console.log('更新的id',this.currentSong.id);
      const {lrc:{lyric}} = await getlyric(this.currentSong.id)
      const newline = /\n/
      const linArr = lyric.split(newline)
      const newtime = /\[\d{2}:\d{2}\.\d{2,3}\]/
      linArr.forEach(item => {
        const obj = {}
        if(item !== ''){
          const time = item.match(newtime)
          obj.lysic = item.split(']')[1].trim()
          obj.time = getLysic(time) 
        }
        this.lysicArr.push(obj)
      });
    },
    async getSimiSong(){
      const {songs} = await getSimiSong(this.currentSong.id)
      this.SimiSong = songs
    },
    goSimiSong(simisong){
      const {id,name,artists,duration,mvid,album: {id:albumId,name:albumName}} = simisong
      const song = createSong({
        id,
        name,
        artists,
        duration,
        albumId,
        albumName,
        mvId:mvid
      })
      this.startSong(song)
    },
    scroller(index){
      if(this.geticy[index].time < this.current && this.geticy[index+1].time > this.current){
      this.content.style.transform = 'translateY('+(200-37*index)+'px)';
      this.$refs.roImg.style.transform = 'rotate('+this.cur+'deg)'
     /*  this.wrapper.scrollTop =parseInt( this.wrapper.scrollHeight * 19 / ((200-19*index)*
      (this.geticy.length + 200)
      ))*index
      console.log('this.wrapper.scrollTop',this.wrapper.scrollTop); */
      }
    }
  },
  computed:{
    ...mapState(['currentSong','currentTime','playstate']),
    geticy(){
      return this.lysicArr 
    },
    current(){
      return parseInt(this.currentTime*1000)
    },
    cur(){
      return parseInt(this.currentTime*10) 
    }
  },
  mounted(){
        console.log('this.wrapper',this.wrapper = this.$refs.wrapper); 
        this.content = this.$refs.content
        this.$refs.imgBar.style.transform = 'rotateZ(-20deg)'
  },
  watch:{
    currentSong(newSong,oldSong){
      if (newSong.id === oldSong.id) {
        return
      }
      console.log('newSong',newSong);
      this.lysicArr = []
      this.getword()
      
    },
    playstate(state){
      console.log('state',state);
    if(state){
        this.$refs.imgBar.style.transform = 'rotateZ(5deg)'
      }else{
        this.$refs.imgBar.style.transform = 'rotateZ(-20deg)'
      }
    },
    lysicArr(val){
      console.log('val',val);
        this.content = this.$refs.content
        this.wrapper = this.$refs.wrapper
        this.content.style.transform = 'translateY(200px)';
    }
  }
}
</script>

<style lang="scss" scoped>
  .playerpanel{
    .drawer{
      padding: 90px 200px;
      position: fixed;
      background-color: #fff;
      top: 0;
      left: 0;
      right: 0;
      bottom: 60px;
      .drawer-song{
        display: flex;
        justify-content: center;
        position: relative;
        .img-wrap{
          margin-right: 20px;
          width: 250px;
          height: 250px;
          margin-top: 80px;
          .img-bar{
            position: absolute;
            width: 100px;
            height: 153px;
            top: -20px;
            left:315px;
            transform-origin:0 0;
            transition: all .5s;
          }
          .roImg{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: all 1s;
            border:35px solid #d33a31;
          }
        }
        .song-wrap{
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 210px;
          .song-header{
            margin-bottom: 10px;
            .header-name{
              font-size: 30px;
              padding-bottom: 10px;
            }
            .header-artist{
              font-size: 15px;
              text-align: center;
              font-weight: 200;
            }
          }
          .song-content{
            margin-top: 10px;
            max-height: 300px;
            overflow: hidden;
            text-align: center;
            .contentplayer{
              transform: translateY(200px);
              transition:  all 1s;
              li{
                padding: 10px 0px;
                font-size: 15px;
                font-weight: 800;

              }
            }
            .active{
              color: #d33a31;
            }
          }
        }
      }
    }
  }
</style>