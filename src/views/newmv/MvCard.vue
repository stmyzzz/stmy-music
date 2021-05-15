<template>
  <div class="mv-card">
    <div @click="goMv(mv.id)" v-for="(mv,index) in mvData" :key="index" class="card-item">
      <div class="img-wrap">
        <img :src="mv.cover" alt="">
      </div>
      <div class="mv-count">{{$utils.numPerson(mv.playCount)}}</div>
      <div class="mv-time">{{$utils.numDate((mv.duration)/1000)}}</div>
      <div class="mv-content">
        <p class="mv-name">{{mv.name}}</p>
        <p class="mv-artists">{{mv.artistName}}</p>
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
    margin-top: 1rem;
    .card-item{
      position: relative;
      width: calc(25% - 1.4rem);
      margin:0 .7rem;
      cursor: pointer;
      margin-bottom:2rem;
      .img-wrap{
        width: 100%;
        height: 100%;
        img{
          width:100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .mv-count{
        position: absolute;
        top: 5px;
        right: 5px;
        color: #fff;
      }
      .mv-time{
        position: absolute;
        bottom: 45px;
        right: 5px;
        color: #fff;
      }
      .mv-content{
        margin-top: .5rem;
        .mv-name{
          color: var(--font-color);
          @include text-ellipsis()
        }
        .mv-artists{
          color: var(--font-color-grey-shallow);
        }
      }
    }
  }
</style>