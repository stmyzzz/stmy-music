<template>
  <div class="comments">
    <div class="hotcomments" v-if="HotCommentShow" >
      <Title title="热门评论"> </Title> 
      <Comment v-for="(hotcomm,index) in hotComments" :key="index" :comment="hotcomm"> 
      </Comment>      
    </div>
    <div class="newcomment" v-if="NewCommentShow" >
      <Title title="最新评论" :total="total">
        <slot name="total" ></slot>
        </Title>   
      <Comment v-for="(newcomm,index) in comments" :key="index" :comment="newcomm"> 
      </Comment>      
    </div>
    <div class="comment-page">
      <el-pagination
          :current-page.sync="currentPage"
          :page-size="limit"
          :total="total"
          @current-change="onPageChange"
          layout="prev, pager, next"
            >
      </el-pagination>      
    </div>
  </div>
</template>

<script>
import {getHotComment,getPlaylistComment,getMvComment,getMusicComment} from '@/api'
import Comment from '@/components/comment'
import {getPageOffset} from '@/utils'
const PLAYLIST_TYPE = 'playlist'
const MV_TYPE = 'mv'
const SONG_TYPE = 'song'
export default {
  props:{
    id:{
      type:Number,
      required:true
    },
    type:{
      type:String,
      default:SONG_TYPE
    },
    tota:{
      type:Boolean,
      default:false
    },
    limit:{
      type:Number,
      default:30
    }
  },
  data(){
    return {
      hotComments:[],
      comments:[],
      currentPage:1,
      total:0,
    }
  },
  components:{
    Comment
  },
  created(){
    this.getComment()
  },
  methods:{
    async getComment(){
      if(this.type == PLAYLIST_TYPE && this.currentPage === 1){
        this.getHotComment()        
      }

      this.getNewComment()
    },
    async getHotComment(){
      let hotres = await getHotComment({
        id:this.id,
        type:2
      })
      const {hotComments} = hotres
      this.hotComments = hotComments
      console.log('this.hotcomments',this.hotComments);
    },
    async getNewComment(){
      const commentMap = {
        [SONG_TYPE] : getMusicComment,
        [PLAYLIST_TYPE] : getPlaylistComment,
        [MV_TYPE] : getMvComment,
      }
      console.log('this.type',this.type);
      const commentRequest = commentMap[this.type]
      console.log(commentRequest);
      let newres = await commentRequest({
        id:this.id,
        limit:this.limit,
        offset:getPageOffset(this.currentPage,this.limit),
        type:this.type
      })
      const {comments,total} = newres
      this.comments = comments
      this.total = total
      console.log('total233',this.total);
      this.$emit('update', { total })
    },
    onPageChange(page){
      this.currentPage = page
      this.getNewComment()
    }
  },
  computed:{
    HotCommentShow(){
      return this.hotComments.length >0 && this.currentPage == 1
    },
    NewCommentShow(){
      return this.comments.length >0
    }
  },
  watch: {
    id: {
      handler(id) {
        if (id) {
          this.currentPage = 1
          this.getComment()
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
  .comments{
    .comment-page{
      margin:30px 0px;
    }
  }
</style>