<template>
  <div id="app">
    <Layout/>
    <Player/>
  </div>
</template>

<script>
import Layout from '@/layout'
import Player from '@/components/player'
export default {
  name:'app',
  components:{
    Layout,
    Player
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
