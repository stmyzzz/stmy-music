<template>
  <div class="tabs">
    <ul>
      <router-link  active-class="tab_active" tag="li"  v-for="(tab,index) in tabs" :to="tab.to" @click="tabClick(index)" :key="index">{{tab.title}}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    tabs:{
      type:Array,
      default:() => []
    }
  },
  model: {
      prop: 'index',
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
      this.$emit('tabChange',index)
      this.currenTab = index
    }
  }

}
</script>

<style lang="scss" scoped>
  .tabs{
    ul{
      display: flex;
      align-items: center;
      li{
        margin: 0px 12px;
        color: var(--font-color);
        padding: .4rem 1rem;
        cursor: pointer;
      }
    }
    .tab_active{
      color: #d33a31;
      background-color: var(--shallow-theme-bgcolor);
      border-radius: 5px;
    }
  }
</style>