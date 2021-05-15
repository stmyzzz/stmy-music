<template>
  <div class="comment">
      <div class="img-wrap">
        <img :src="comment.user.avatarUrl" alt="">
      </div>
      <div class="content-wrap">
        <p class="user-wrap">{{comment.user.nickname}}：{{comment.content}}</p>
        <div class="comment-reply" v-if="comment.beReplied[0]">
          <p>
            <span class="username"> {{comment.beReplied[0].user.nickname}}</span>
            <span class="content"> {{comment.beReplied[0].content}}</span>            
          </p>
        </div>
        <p class="time-wrap">
          <span> {{$utils.formatDate(comment.time) }}</span>
          <span>
            <Icon :size="12" type="good" />
            {{comment.likedCount}}</span>
        </p> 
    </div>       
  </div>
</template>

<script>
export default {
  props:["comment"],
  data(){
    return {
      
    }
  },
  methods:{
    
  },
  created(){
    
  }
}
</script>

<style lang="scss" scoped>
  .comment{
    display: flex;
    padding: 15px 0px;
    border-bottom: 1px solid #f5f5f5;
      .img-wrap{
        width: 45px;
        height: 45px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .content-wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        flex: 1;
        .user-wrap{
          margin-bottom: 7px;
        }
        .comment-reply{ 
          background-color: var(--song-shallow-grey-bg);
          color: #fff;
          padding: .5rem;
          border-radius: 5px;
          .username{
            color: #517eaf;
          }
          .content{
            color: rgb(22, 22, 22);
          }
        }
        .time-wrap{
          margin-top: 7px;
          display: flex;
          justify-content: space-between;
          color: var(--font-color-grey-shallow);
        }
      }
    }
</style>