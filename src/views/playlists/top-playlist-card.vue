<template>
  <div class="top-playlist-card">
    <div class="wrap">
    <div class="top_playlist">
      <div class="img_wrap">
        <img :src="topCard.coverImgUrl" alt="">
      </div>
      <div class="content_wrap">
        <div class="tag_wrap">
          <span>精品歌单</span>
          </div>
        <p class="name">{{topCard.name}}</p>
        <p class="desc">{{topCard.description}}</p>
      </div>      
    </div>  
    <div class="background" :style="{backgroundImage:`url(${topCard.coverImgUrl})`}"></div>      
    </div>

  </div>
</template>

<script>
export default {
  props:(['topCard']),
}
</script>

<style lang="scss" scoped>
  .top-playlist-card{
    margin-bottom: 15px;
  }
  .wrap{
    position: relative;
    overflow: hidden;
    .top_playlist{
      position: relative;
      display: flex;
      z-index: 1;
      padding: 1rem;
      box-sizing: content-box;
      .img_wrap{
        @include wh(150px,150px);
        img{
          width:100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .content_wrap{
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .tag_wrap{
          color: #e7aa5a;
          margin-bottom: 24px;
          border: 1px solid #e7aa5a;
          padding: .3rem .6rem;
          align-self:flex-start;
          border-radius: 3px
        
        }
        .name{
          @include sc(20px,#fff);
          margin-bottom: 10px;
        }
        .desc{
          @include sc(12px,rgb(48, 48, 48));
        }
      }
    }  
    .background{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 0;
      filter: blur(.8rem);
    }  
  }

</style>