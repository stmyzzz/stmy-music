<template>
  <div class="mv-card">
    <div @click="goMv(mv.id)" v-for="(mv,index) in mvData" :key="index" class="card-item">
      <div class="img-wrap">
        <img :src="mv.cover" alt="">
      </div>
      <div class="content-wrap">
        <div class="mv-count">{{$utils.numPerson(mv.playCount)}}</div>
        <div class="mv-time">{{$utils.numDate((mv.duration)/1000)}}</div>
        <div class="mv-content">
          <p class="mv-name">{{mv.name}} - {{mv.artistName}}</p>
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    mvData:{
      type:Array,
      default:()=>[]
    }
  },
  methods:{
    goMv(mvId){
      this.$router.push(`/mv/${mvId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mv-card{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 1rem;
    .card-item{
      position: relative; 
      margin:0 -5rem;
      cursor: pointer;
      margin-bottom:1.5rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .img-wrap{
        min-width: 100%;
        height: 100%;
        img{
          width:100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .content-wrap{
        .mv-count{
          position: absolute;
          top: 10px;
          right: 10px;
          color: #fff;
        }
        .mv-time{
          position: absolute;
          bottom: 33px;
          right: 10px;
          color: #fff;
        }
        .mv-content{
          margin-top: .5rem;
          .mv-name{
            color: var(--font-color);
            @include text-ellipsis();
            text-align: center;
          }
          .mv-artists{
            color: var(--font-color-grey-shallow);
          }
        }        
      }

    }
  }
</style>