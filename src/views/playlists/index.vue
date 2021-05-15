<template>
  <div class="playlist" >
    <top-playlist-card :topCard="topPlaylist" />
      <div class="chooseTag">
        <span class="tag" v-for="(tag,index) in tabs" :class="currentTag == index? 'tag_active':''" @click="goTag(tag,index)" :key="index">{{tag}}</span>
      </div>
    <PlaylistCard :playlist="playlist" >
    </PlaylistCard>    
    <div class="el_page">
          <el-pagination
        :background="true"
        :current-page.sync="currentPage"
        :page-size="30"
        :total="total"
        @current-change="onPageChange"
        layout="prev, pager, next"
          >
        </el-pagination>          
        </div>
  </div>
</template>

<script>
import TopPlaylistCard from './top-playlist-card'
import PlaylistCard from './PlayListCard'
import {getTopPlayList,getPlayList} from '@/api'

export default {
  data(){
    return {
      topPlaylist:[],
      tags:[],
      playlist:[],
      total:null,
      currentPage:0,
      tag:null,
      currentTag:0
    }
  },
  created(){
    this.initData()
    this.tabs = [
      "全部",
      "欧美",
      "华语",
      "流行",
      "说唱",
      "摇滚",
      "民谣",
      "电子",
      "轻音乐",
      "影视原声",
      "ACG",
      "怀旧",
      "治愈",
      "旅行"
    ]
  },
  components:{
    TopPlaylistCard,
    PlaylistCard
  },
  methods:{
    async initData(){
      this.getTopPlayLists()
      this.getPlayLists()
    },
    async getTopPlayLists(){
      let res = await getTopPlayList({
        limit:1
      })
      const {playlists} = res
      this.topPlaylist = playlists[0]
      console.log('res',playlists)
    },
    async getPlayLists(){
      let res2 = await getPlayList({
        limit:30,
        offset:this.getPageOffset(this.currentPage,50),
        cat:this.tag
      })
      console.log('res2',res2);
      const {playlists,total} = res2
      this.playlist = playlists
      this.total = total
    },
    getPageOffset(page,limit){
      return (page-1)*limit
    },
    async onPageChange(page) {
      this.currentPage = page
      this.getPlayLists()
    },
    goTag(tag,index){
      this.tag = tag
      this.currentTag = index
      this.currentPage = 0
      this.getPlayLists()
    }
  }
}
</script>

<style lang="scss" scoped>
  .playlist{
    padding: .8rem;
    margin-bottom: 100px;
      .chooseTag{
        margin: 10px 0px;
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        .tag{
          padding: .3rem .5rem;
          margin-right: 10px;
          color: var(--font-color);
          
        }
        .tag_active{
            color: #d33a31;
          }
      }
    .el_page{
          width: 100%;
        }
  }
</style>