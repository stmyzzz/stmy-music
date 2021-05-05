<template>
  <div class="search_container">
    <el-input 
    @click.native="onClickInput"  suffix-icon="el-icon-search" 
    size="small" 
    v-model.trim="searchKeyword" 
    placeholder="搜索"
    @keypress.native.enter="onEnterpress"
    @input="onInput"
    @blur="stopblur"
    ></el-input>
    <!-- 搜索框信息 -->
    <div ref="searchbox" v-show="searchPanelShow" class="search_panel">
      <div class="search_suggest" v-if="suggestShow" >
        <div class="suggest-item" v-for="(suggestItem,index) in suggestmap" :key="index" >
          <div class="title">
            <Icon :size="12" :type="suggestItem.icon">
            </Icon>
            <span>{{suggestItem.title}}</span>
          </div>
          <ul class="list">
            <li class="item_li" v-for="item in suggestItem.data" :key="item.id" @click="suggestItem.onClick(item)">
              <light-text :text="suggestItem.renderName ? suggestItem.renderName(item) : item.name"></light-text>
            </li>
          </ul>
        </div>
      </div>
      <div class="search_hots" v-else>
        <div class="block">
          <p class="title">热门搜索</p>
          <div class="tags">
            <SEbutton v-for="(hot,index) in searchHot" :key="index" class="button" @click="onClickhot(hot)">
              {{hot.first}}
            </SEbutton>            
          </div>
        </div>
        <div class="block">
          <p class="title">
          <span>搜索历史</span> 
          <span style="cursor: pointer" @click="removeHistorys">清空</span>
            </p>
          <div class="tags">
            <SEbutton v-for="(history,index) in searchHistorys" :key="index" class="button" @click="onClickhot(hot)" >
              {{history}}
            </SEbutton> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearchHot,Search} from '@/api'
import {setStore,getStore,removeStore,getArtistText} from '@/utils'
import {debounce} from '@/utils'
const SEARCH_HISTORY_KEY = "search_history"
export default {
  name:'serach',
  data(){
    return {
      searchPanelShow:false,
      searchHot:[],
      searchHistorys:[],
      suggest:[],
      searchKeyword:""
    }
  },
  mounted(){
    this.initData()
    document.addEventListener('click',(e)=>{
      let thisClassName = e.target.className
      console.log(thisClassName);
      if(thisClassName !== "el-input__inner"){
        this.searchPanelShow = false
      }
    })
  },
  computed:{
    suggestShow(){
      return (
        this.searchKeyword.length && 
        ['songs','artists','albums','playlists'].find(key=>{
          return this.suggest[key] && this.suggest[key].length
        })
      )
    },
    suggestmap(){
      return [
        {
          title:'单曲',
          icon:'music',
          data:this.suggest.songs,
          renderName(song){
            return `${song.name} - ${getArtistText(song.artists)}`
          },
          onClick:this.onClickSong.bind(this)
        },
        {
          title:'歌手',
          icon:'yonghu',
          data:this.suggest.artists,
          onClick:this.onClickArtist.bind(this)
        },
        {
          title:'专辑',
          icon:'mv',
          data:this.suggest.albums,
          onClick:this.onClickMv.bind(this)
        },
        {
          title:'歌单',
          icon:'playlist',
          data:this.suggest.playlists,
          onClick:this.onClickPlaylist.bind(this)
        }
      ].filter(item => item.data && item.data.length)
    }
  },
  methods:{
    initData(){
      if(getStore(SEARCH_HISTORY_KEY)){
        this.searchHistorys = JSON.parse(getStore(SEARCH_HISTORY_KEY)) 
      }else{
        this.searchHistorys = []
      }
    },
    async onClickInput(){ 
      this.searchPanelShow = true
    const hots = await getSearchHot()
    this.searchHot = hots.data.result.hots
    console.log('hots',hots)
    },
    onInput:debounce(function(value){
      if(!value.trim()) return
      console.log(value);
      Search(value).then(res=>{
        this.suggest = res.data.result
        console.log('suggest',this.suggest);
      })
    },500),
    onEnterpress(){
      if(this.searchKeyword){
        this.goSearch(this.searchKeyword)
      }
    },
    goSearch(keyword){
      console.log('searchHistorys',this.searchHistorys)
        let checkrepeat = false;      
      this.searchHistorys.forEach(item => {
        if(item == keyword){
          checkrepeat = true
        } 
        });
        if(!checkrepeat){
          this.searchHistorys.push(keyword)
          console.log('thispush',this.searchHistorys)
          setStore(SEARCH_HISTORY_KEY,this.searchHistorys)
        }
    },
    removeHistorys(){
      removeStore(SEARCH_HISTORY_KEY);
      this.searchHistorys = [];
    },
        onClickPlaylist(item) {
      const { id } = item
      this.$router.push(`/playlist/${id}`)
      this.searchPanelShow = false
    },
    onClickMv(mv) {
      console.log(mv);
    },
    onClickArtist(artist) {
      console.log(artist);
    },
    onClickSong(item){
      console.log(item)
    },
    stopblur(){/* 
      this.searchPanelShow = false */
    }
    }
}
</script>

<style lang="scss" scoped>
  .search_container{
    @include fc;
    margin-right: 20px;
    .search_panel{
      position: fixed;
      top: $header-height;
      bottom: $mini-player-height;
      right: 0;
      width: 350px;
      background: var(--search-bgcolor);
      font-size: $font-size-sm;
      z-index:$search-panel-z-index;
      overflow-y: auto;
      .block{
        padding: 15px 20px;
        .title{
          @include fc;
          justify-content: space-between;
          color:var(--font-color-grey);
          margin-bottom:15px;
        }
        .tags{
          display: flex;
          flex-wrap: wrap;
          .button{
            margin-bottom: 12px;
            margin-right: 6px;
            font-size: $font-size-sm;
          }
        }
      }
      .suggest-item{
        margin-bottom: 10px;
        .title{
          padding: 15px 10px 10px 0px;
          display: flex;
          align-items: center;
          color: var(--font-color-grey-shallow);
          span{
            margin-left: 3px;
          }
        }
        .list{
          .item_li{
            padding: 12px 18px;
            cursor: pointer;
            &:hover{
              background-color: var(--light-bgcolor);
            }
          }
        }
      }
    }
  }
</style>