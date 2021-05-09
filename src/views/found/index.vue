<template>
  <div class="found">
    <banner /> 
    <newsong />
    <commond-play-list />
    <commond-mv></commond-mv>
  </div>
</template>

<script>
import banner from './banner.vue'
import newsong from './NewSong'
import CommondPlayList from './CommondPlayList.vue'
import CommondMv from './CommondMv'
export default {
  components: { banner,newsong,CommondPlayList,CommondMv },
  name:'found'
}
</script>

<style lang="scss" scoped>
  .found{
    min-width: 40rem;
    max-width: 64rem;
    margin: auto;
  }
</style>