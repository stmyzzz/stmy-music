<template>
  <div class="newmusic">
    <div class="content">
      <music-tabs :tabs="tabs" @tabChange="tabChange" v-model="currentType"></music-tabs>
      <music-table  :TopSongs="TopSongs"></music-table>
    </div>

  </div>
</template>

<script>
import {createSong} from '@/utils'
import {getTopSongs} from '@/api'
import MusicTable from './MusicTable' 
import MusicTabs from './MusicTabs'
export default {
  name:'newmusic',
  data(){
    return {
      currentType:0,
      TopSongs:[]
    }
  },
  components:{
    MusicTable,
    MusicTabs
  },
  created(){
    this.tabs = [
      { title: "全部", type: 0 },
      { title: "华语", type: 7 },
      { title: "欧美", type: 96 },
      { title: "日本", type: 8 },
      { title: "韩国", type: 16 },
    ],
    this.initData()
  },
  methods:{
    async initData(){
      let type = this.currentType
      this.getTopSongs(type)
    },
    async getTopSongs(){
      console.log(this.currentType)
      let res = await getTopSongs(this.tabs[this.currentType].type)
      const TopSongs = res.data
      this.TopSongs = TopSongs.map(song =>{
        const {
          id,
          name,
          artists,
          duration,
          mvid,
          album:{picUrl,name:albumName}
        } = song

        return createSong({
          id,
          name,
          artists,
          duration,
          albumName,
          img:picUrl,
          mvId:mvid
        })
      })
      console.log('songs',TopSongs);
    },
    tabChange(index){
      console.log('we');
      this.currentType = index
      this.getTopSongs()
    }
  }
}
</script>

<style lang="scss" scoped>
  h1{
    color: var(--font-color);
  }
  .newmusic{
    .content{
      margin:10px 110px;
      text-align: center;
    }
  }
</style>