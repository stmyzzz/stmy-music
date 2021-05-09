<template>
  <div class="newsong">
    <Title title="最新音乐"></Title>
    <div class="song_wrap">
      <div class="list" v-for="(list,index) in SongList" :key="index">
        <div @click="onClickSong(5*index+itemIndex)" class="list-item" v-for="(item,itemIndex) in list" :key="itemIndex" >
          <div class="item_left">{{5*index+itemIndex+1}}</div>
          <div class="item_center">
            <img :src="item.img" alt="">
          </div>
          <div class="item_right">
            <p class="item_title">{{item.name}}</p>
            <p class="item_artist">{{item.artistsText}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNewSong} from '@/api'
import {createSong} from '@/utils'
import { mapActions } from "vuex"
export default {
  name:'NewSong',                     
  data(){
    return {
      NewSong:[],
      limitItem : 5,
    }
  },
  mounted(){
    this.initData()
  },
  computed:{
    SongList(){
      return [
        this.initSongs.slice(0,this.limitItem),
        this.initSongs.slice(this.limitItem,this.initSongs.length)
      ]
    },
    initSongs(){
      return this.NewSong.map(song => this.createinitSong(song))
    }
  },
  methods:{
    ...mapActions(["startSong"]),
    async initData(){
      let res = await getNewSong()
      this.NewSong = res.data.result
      console.log('newsong',this.NewSong)
    },
    createinitSong(song){
      const {
        id,
        name,
        picUrl,
        song:{
          mvid,
          artists,
          duration
        }
      } = song
      return createSong({
        id,
        name,
        muId:mvid,
        artists,
        img:picUrl,
        duration
      })
    },
    onClickSong(index){
      const normalSong = this.initSongs[index]
      console.log('noramlSong',normalSong);
      console.log('initSongs',this.initSongs);
      console.log('this.songlist',this.SongList);
      this.startSong(normalSong)
    }
  }
}
</script>

<style lang="scss" scoped>
  .song_wrap{
    display: flex;
    margin-top: 20px;
    .list{
      flex: 1;
      .list-item{
        display: flex;
        margin-bottom: 20px;
        padding: .4rem;
        cursor: pointer;
        &:hover {
          background-color: var(--light-bgcolor);
        }
        .item_left{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item_center{
          flex: 1;
          margin-right: 10px;
          img{
            width: 70px;
            height: 70px;
          }
        }
        .item_right{
          flex: 9;
          display: flex;
          flex-direction:column;
          justify-content: center;
          .item_title{
            margin-bottom: 10px;
          }
        }
      }
    }

  }
</style>