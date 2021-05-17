<template>
  <div  ref="nowplaylist" class="now-playlist">
    
    <div class="playlist-table">
      <h1 class="playlist-title" >播放列表</h1>
      <p @click="ClearPlayList">清空</p>
      <el-table
      :data="playlistHistory"
      style="width: 100%"
      :show-header="false"
      @row-click="goSong">
      <el-table-column
        type="index"
        width="60"
        align="center">
      </el-table-column>   
      <el-table-column
        >
        <template slot-scope="scope">
          <div class="table-name">
          <span class="textell">{{scope.row.name}}</span>
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
        width="100">
        <template slot-scope="scope">
          <div class="table-name">
            <span class="textell">{{scope.row.artistsText}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="durationSecond"
        width="70">
      </el-table-column>
      <el-table-column
        prop=""
        width="40">
        <template slot-scope="scope">
          <div class="table-name">
            <span class="textell" style="font-size:30px" @click.stop="delSong(scope.$index)">X</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'nowplaylist',
  data(){
    return {
    }
  },
  computed:{
    ...mapState(['isPlaylistShow','playlistHistory']),
  },
  methods:{
    ...mapMutations(['setPlayListShow','setCurrentSong','delPlayList','clearPlayList']),   
    goSong(song){
      console.log('播放了');
      this.setCurrentSong(song)
    },
    delSong(index){
      console.log('index',index);
      this.delPlayList(index)
    },
    ClearPlayList(){
      this.clearPlayList()
    }
  }
}
</script>

<style lang="scss" scoped>
    .now-playlist{
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    right: 0;
    width: 30%;
    background: var(--search-bgcolor);
    font-size: $font-size-sm;
    z-index:$search-panel-z-index;
    overflow-y: auto;
    padding: 10px;
    .playlist-title{
      font-weight: 700;
      padding: 10px 0px 10px 25px;
      font-size: 17px; 
    }
    .textell{
      @include text-ellipsis()
    }
  }
</style>