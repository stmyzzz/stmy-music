<template>
  <div class="music-table">
      <el-table
      :show-header="false"
      :data="TopSongs"
      style="width: 100%"
      @row-click="goSong">
      <el-table-column
        type="index"
        width="100"
        align="center">
      </el-table-column>      
      <el-table-column  
        prop="album.blurPicUrl"
        width="100"
        
        >
        <template slot-scope="scope">
          <img :src="scope.row.img" width="30" height="40" class="table_img"/>
        </template>
      </el-table-column>
      <el-table-column
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
        prop="artists" :formatter="changeartists"
        width="230"
        >
      </el-table-column>
      <el-table-column  
        prop="albumName" 
        width="170"
        >
      </el-table-column>
      <el-table-column  
        prop="duration"  
        :formatter="changeduration"
        width="130"
        align="center"
        >
      </el-table-column>
    </el-table>    
  </div>
</template>

<script>
import {getArtists,numDate} from '@/utils'
import { mapActions, mapState } from "vuex"
export default {
  props:['TopSongs'],
    computed:{
    ...mapState(['currentTime']),
  },
  methods:{
    ...mapActions(["startSong"]),
    changeartists(row){
      return `${getArtists(row.artists)}`
    },
    changeduration(row){
      let date = (row.duration)/1000
      return `${numDate(date)}`
    },
      goSong(row){
      console.log(row,'row');
      this.startSong(row);
    }
  }
}
</script>

<style lang="scss">
      .table_img{
      @include wh(60px,60px);
      border-radius: 5px;
    }
    .table-name{
      display: flex;
      align-items: center;
      .mv-icon{
        margin-left: 5px;
      }
    }
</style>