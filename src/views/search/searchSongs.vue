<template>
  <div class="searchSongs">
    <ul>
      <el-table
      :data="songs"
      style="width: 100%"
      @row-click="goSong">
      <el-table-column
        type="index"
        width="100"
        label="序号"
        align="center">
      </el-table-column>   
      <el-table-column
        label="音乐标题"
        >
                <template slot-scope="scope">
          <div class="table-name">
          <span>{{scope.row.name}}</span>
          <span class="mv-icon" v-if="scope.row.mvId">
            <Icon
              type="mv"
              color="theme"
              :size="18"/>
          </span>            
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="artistsText"
        label="歌手"
        width="400">
      </el-table-column>
      <el-table-column
        prop="albumName"
        label="专辑"
        width="250">
      </el-table-column>
      <el-table-column
        prop="durationSecond"
        label="时长"
        width="100">
      </el-table-column>
    </el-table>
    </ul>
    <!-- 组件封装 -->
    <Pagination :limit="30" @getListData="getSearchSong"
    :getParams="getParams" 
    :getData="SearchDetail" > 
    </Pagination>
  </div>
</template>

<script>
import {SearchDetail} from '@/api'
import {createSong} from '@/utils'
import Pagination from '@/components/pagination'
import { mapActions, mapState } from "vuex"
export default {
  components: { Pagination },
  inject:['searchData'],
  data(){
    return {
      songs:[],
      currentPage:0,
      songCount:0
    }
  },
  created(){
    this.SearchDetail = SearchDetail
    this.initData()
  },
  methods:{
    ...mapActions(["startSong"]),
    async initData(){ 
      this.getSearchSong()  
    },
          goSong(row){
      console.log(row,'rowduration');
      this.startSong(row);
    },
  getSearchSong(res){
      console.log('resss12',res);
      const {result:{songs,songCount}} = res
      this.songs = songs.map(song =>{
      const {id,name,picUrl,mvid,alias,artists,album,duration} = song
      return createSong({
        id,
        name,
        mvId:mvid,
        alias,
        img:picUrl,
        artists,
        albumId:album.id,
        albumName:album.name,
        duration
      })
    })
    this.songCount = songCount
    this.searchData.onUpdateCount(songCount)
    this.searchData.resultName = "歌曲"
  },
  },
  computed:{
    getParams(){
      return {
        keywords:this.searchData.keyword,
        type:1,
      }
    },
    ...mapState(['currentTime']),
  }


}
</script>

<style lang="scss" scoped>
</style>