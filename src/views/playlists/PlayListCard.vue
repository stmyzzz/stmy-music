<template>
  <div class="play-list-card">
    <div class="list">
      <div class="list_item" v-for="(list,index) in playlist" :key="index">
        <div class="img_wrap">
          <img :src="list.coverImgUrl" alt="">            
        </div>
        <p class="name">{{list.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    playlist:{
      type:Array,
      default:() => []      
    }
  }

}
</script>

<style lang="scss" scoped>
    .play-list-card{
      .list{
        display: flex;
        align-items: center;        
        flex-wrap: wrap;
        margin-top: 10px;
        .list_item{
          position: relative;
          margin: .5rem  .8rem;
          width: calc(16.6% - 1.6rem);
          color: var(--font-color);
          display: flex;
          flex-direction: column;
          .img_wrap{
            margin-bottom: 5px;
            width: 100%;
          img{
            width: 100%;
          }            
          }
          .name{
            @include text-ellipsis();
          }
        }
      }
    } 
</style>