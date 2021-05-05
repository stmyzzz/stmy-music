<template>
  <div @click="onClick" class="sebutton">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'SEbutton',
  props:{
    type:{
      type:String,
      default:'common'
    }
  },
  methods:{
    onClick(e){
      this.$emit("click",e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sebutton{
    display: inline-block;
    padding: 5px 15px;
    border: 1px solid var(--button-border-color);
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    &:hover{
      background: var(--button-hover-bgcolor);
    }
  }
</style>