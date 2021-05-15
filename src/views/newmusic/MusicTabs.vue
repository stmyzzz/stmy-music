<template>
  <div class="music-tabs">
    <ul>
      <li :class="currenTab == index ? 'li_active':''" v-for="(tab,index) in tabs" @click="tabClick(index)" :key="index">{{tab.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['tabs'],
  model: {
      prop: 'currentType',
      event: 'tabChange'
  },
  data(){
    return {
      currenTab : 0
    }
  },
  created(){
  },
  methods:{
    tabClick(index){
      console.log('zizizi');
      this.$emit('tabChange',index)
      this.currenTab = index
    }
  }

}
</script>

<style lang="scss" scoped>
  .music-tabs{
    margin: 40px 0px;
    ul{
      display: flex;
      justify-content: flex-end;
      li{
        margin: 0px 12px;
        color: var(--font-color);
      }
      .li_active{
        color: #d33a31;
      }
    }
  }
</style>