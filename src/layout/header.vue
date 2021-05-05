<template>
  <div class="header_container">
    <div class="left">
      <div class="buttons">
        <div class="mac-button red">
          <Icon :size="9" type="home" />  
        </div>
        <div class="mac-button yellow">
          <Icon :size="9" type="minus" />  
        </div>
        <div class="mac-button teal">
          <Icon :size="9" type="fullscreen" />  
        </div>
      </div>
      <!-- 历史记录 -->
      <div
        class="history"
        v-show="!isPlayerShow"
      >
        <RoutesHistory />
      </div>
    </div>
    <div class="right">
      <div class="search_box">
        <Search/>
      </div>
      <Theme/>
    </div>
  </div>
</template>

<script>
import RoutesHistory from '@/components/routes-history'
import Search from '@/components/search'
import Theme from "@/components/theme"
export default {
  name:'headernav',
  components:{
    RoutesHistory,
    Search,
    Theme
  },
  data(){
    return {
      isPlayerShow:false
    }
  }

}
</script>
  
<style lang="scss" scoped>
  .header_container{
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100vw;
    height:$header-height;
    background-color: var(--header-bgcolor);
    padding-right: 30px;
    /deep/.iconfont {
    color: var(--header-font-color);
    }
    @include el-input-theme(
    var(--header-input-color),
    var(--header-input-bgcolor),
    var(--header-input-placeholder-color)
    );
  .left{
    padding: 14px 14px 0 8px;
    display: flex;
    .font-weight{
      white-space: nowrap;
    }
    .buttons {
      display: flex;
      &:hover {
        .mac-button > i {
          opacity: 1;
        }
      }
      .mac-button {
        @include round(18px);
        @include fc;
        margin-right: 8px;
        cursor: pointer;
        &.red {
          background: #ed655a;
        }
        &.teal {
          background: teal;
        }
        &.yellow {
          background: #e0c04c;
        }
        i {
          opacity: 0;
          transform: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-bold;
          transform-origin: center center;
        }
      }
    }

    }
  .right{
    @include fc
  }
  }
</style>