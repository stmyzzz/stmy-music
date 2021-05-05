<template>
  <div id="app">
    <Layout/>
  </div>
</template>

<script>
import Layout from '@/layout'
export default {
  name:'app',
  components:{
    Layout
  }
}
</script>
<style lang="scss">
#app{
  height: 100%;
  font-size: 13px;
  background-color: var(--body-bgcolor);
}

</style>
