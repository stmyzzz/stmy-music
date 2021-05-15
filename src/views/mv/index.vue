<template>
  <div class="mv">
    <div class="mv-content">
      <h1 class="mv-header">
        <span class="mv-name">{{mvDetail.name}}</span>
        <span class="mv-artist">{{$utils.getArtists(mvDetail.artists)}}</span>
      </h1>
      <div class="video">
        <video width="100%" height="100%"
        object-fit="fill" :src="mvPlayInfo.url" controls="controls"></video>        
      </div>
      <div class="mv-intro">
        <Title class="title" title="mv简介"></Title>
        <div class="intro-count">
          <p>发布时间：{{mvDetail.publishTime}}</p>
          <p class="play-count">播放次数：{{mvDetail.playCount}}次</p>          
        </div>
        <p class="mv-desc">{{mvDetail.desc}}</p>
      </div>
      <div class="mv-comment">
        <Comments :id="id" type="mv" :limit="5" :tota="true" @update="mvComment"></Comments>
      </div>
    </div>
    <div class="mv-slide">
      <div class="mv-simi">
        <Title class="title" title="相关推荐"></Title>
        <mv-card :mvData="simiMvs"></mv-card>
      </div>
    </div>
  </div>
</template>

<script>
import {getMvDetail,getSimiMv,getMvUrl} from '@/api'
import {MenuControl} from '@/utils'
import MvCard from './mv-card'
import Comments from '@/components/comments'
export default {
  mixins:[MenuControl],
  data(){
    return{
      mvDetail:{},
      mvPlayInfo:{},
      simiMvs:[],
      mvCommentCount:0
    }
  },
  created(){
    this.initData()
  },
  components:{
    MvCard,
    Comments
  },
  methods:{
    mvComment({total}){
      this.mvCommentCount = total
    },
    async initData(){
      const [
        {data:mvDetail},
        {data:mvPlayInfo},
        {mvs},
      ] = await Promise.all([
        getMvDetail(this.id),
        getMvUrl(this.id),
        getSimiMv(this.id)
      ])
      this.mvDetail = mvDetail
      this.mvPlayInfo = mvPlayInfo
      this.simiMvs = mvs
      console.log('mvDetail',mvDetail)
      console.log('mvPlayInfo',mvPlayInfo)
      console.log('simiMvs',mvs)
    },
    async getMvDetail(){
      let detailres = await getMvDetail(this.id)
      console.log('detailres',detailres);
      const {data} = detailres
      console.log('data',data);
      this.mv = data
    },
    async getSimiMv(){
      let simires = await getSimiMv(this.id)
      console.log('simires',simires);
    },
  },
  computed:{
    id(){
      return Number(this.$route.params.id)
    }
  },
  watch:{
    id:'initData'
  }
}
</script>

<style lang="scss" scoped>
  .mv{
    padding: 10px 20px;
    display: flex;
    margin: 30px 180px;
    .mv-content{
      flex: 3;
      .mv-intro{
        color: var(--font-color);
        margin: 20px 0px;
        letter-spacing: .05rem;
        .intro-count{
          color: var(--font-color-grey-shallow);
          margin-bottom: 15px;
          line-height: 1.1rem;
          display: flex;
          .play-count{
            margin-left: 20px;
          }
        }
        .mv-desc{
          line-height: 1.2rem;
        }
      }
      .video{
        width: 100%;
        video{
          width: 100%;
          height: 450px;
          object-fit:fill
        }
      }  
      .mv-header{
        display: flex;
        align-items:baseline;
        margin-bottom: 5px;
        .mv-name{
          font-size: 30px;
          color: var(--font-color);
          margin-bottom: 5px;
        }    
        .mv-artist{
          color: #0c73c2;
          margin-left: 10px;
          font-size: 17px;
          font-weight: 300;
        }     
      }
    }
    .mv-slide{
      flex: 1;
      padding: 30px 0px;
      .mv-simi{
        padding: 0 28px;
        .title{
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
        }
      }
      
    }
  }
</style>