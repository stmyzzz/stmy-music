<template>
  <div class="index">
    <div class="playlist-header">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="infor-wrap">
        <div class="name">{{playlist.name}}</div>
        <div class="creator-content">
          <img :src="playlist.creator.avatarUrl" alt="">
          <p>{{playlist.creator.nickname}}</p>
          <p>{{playlist.createTime}}</p>
        </div>
        <div class="play-all">
          
          <div class="play">播放全部</div>
        </div>
      </div>
    </div>
    <div class="tags">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">
          <music-table :TopSongs="songs" ></music-table>
        </el-tab-pane>
        <el-tab-pane  name="second">
          <span slot="label">评论 ({{total}})</span>
          <Comments @update="CommentCount" :id="id" type="playlist" >
          </Comments>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="input">

    </div>
  </div>
</template>

<script>
import {createSong} from '@/utils'
import MusicTable from '../newmusic/MusicTable'
import {getPlaylistDetail,getSongDetail,getPlaylistComment} from '@/api'
import {getPageOffset} from '@/utils'
import Comments from '@/components/comments'
export default {
  data(){
    return {
      playlist:{},
      activeName: 'first',
      songs:[],
      currentPage:0,
      limit:30,
      total:0
    }
  },
  mounted(){
    this.initData()
  },
  components:{
    MusicTable,
    Comments
  },
  computed:{
    id(){
      return Number(this.$route.params.id)
    },
    getParams(){
      return {
        id:this.id,
        limit:30,
        offset:getPageOffset(this.currentPage,30)
      }
    }
  },
  methods:{
    CommentCount({total}){
      this.total = total
    },
    async initData(){
      let res = await getPlaylistDetail(this.id)
      const {playlist} = res
      this.playlist = playlist
      console.log('playlist123',this.playlist);
      this.getSongDetail(this.playlist)
    },
    async getSongDetail(playlist){
      const trackIds = playlist.trackIds.map(({id}) => id)
      const songDetail = await getSongDetail(trackIds.slice(0,500))
      console.log(songDetail)
      const {songs} = songDetail
      this.songs = songs.map(({id,name,mv,ar,al,dt}) =>
      createSong({
        id,
        name,
        artist:ar,
        mvId:mv,
        albumName:al.name,
        img:al.picUrl,
        duration:dt
      })
      )
      console.log('songs',this.songs);
    },
    async getPlaylistComment(){
      let res = await getPlaylistComment(this.getParams)
      console.log('resc',res);
      /* let res2 = await getPlaylistComment({
        id:this.id
      })
      console.log('resc',res2); */
    },
    handleClick(tab) {
      console.log(tab.index);
      if(tab.index == 1){
        this.getPlaylistComment()
      }else if(tab.index == 0){
        this.initData()
      }
    },
    onPageChange(page){
      this.currentPage = page
      this.getPlaylistComment()
    }
  },
  watch:{
    id:{
      handler(){
        this.initData()
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .index{
    margin: 20px 35px;
  }
  .tags{
    margin-top: 15px;
  }
  .playlist-header{
    display: flex;
    .img-wrap{
      width: 150px;
      height: 150px;
      margin-right: 25px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .infor-wrap{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name{
        font-size: 20px;
        color: var(--font-color);
      }
      .creator-content{
        display: flex;
        align-items: center;
        img{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        p{
          font-size: 14px;
          color: var(--font-color);
          margin-right: 10px;
        }
      }
      .play-all{
        cursor: pointer;
        .play{
          display: inline-block;
        background-color: #f95043;
        padding: 10px 18px;
        border-radius: 5px;
        color: #fff;
        }
      }
    }
  }
</style>