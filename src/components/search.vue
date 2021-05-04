<template>
  <div class="search_container">
    <el-input  suffix-icon="el-icon-search" size="small" v-model="input" placeholder="搜索"></el-input>
  </div>
</template>

<script>
export default {
  name:'serach',
  data(){
    return {
      input:''
    }
  }

}
</script>

<style lang="scss" scoped>
  .search_container{
    @include fc;
    margin-right: 20px;
  }
  $input-height: 24px;
    .el-input__inner {
    height: $input-height !important;
    line-height: $input-height !important;
    background: #{$bg-color} !important;
    border: none !important;
    color: #{$color} !important;

    &:hover {
      border: none !important;
    }
  }
  .el-input__prefix {
    i {
      line-height: $input-height + 1px !important;
      color: #{$color} !important;
      transition: none !important;
    }
  }
</style>