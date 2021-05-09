<template>
<div class="title_wrap">
  <p class="title">{{title}}</p>
</div>
</template>

<script>
export default {
  name:'Title',
  props:{
    title:{
      type:String,
      default:'未填写'
    }
  }
}
</script>

<style lang="scss" scoped>
.title_wrap{
  margin-bottom: 20px;
  .title{
    font-size: 20px;
    font-weight: bold;
    color: var(--font-color);
  }
}

</style>