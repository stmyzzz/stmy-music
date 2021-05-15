
<script>
/* import {toRem} from '@/utils' */
export default {
  name:'Icon',
  props:{
    size:{
      type:Number,
      default:16
    },
    type:{
      type:String,
      require:true
    },
    color:{
      type:String,
      default:""
    },
    backdrop:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    getIconClass(){
      let cls = `icon-${this.type}`
      if(this.color){
        cls += ` icon-color-${this.color}`
      }
      return cls
    },
    onClick(e){
      this.$emit('click',e)
    },
    getIconStyle(){
      const setStyle = {fontSize:this.size}
      return setStyle
    }
  },
  render(){
    const Icon = (
      <i
      onClick={this.onClick}
      class={`iconfont icon-component ${this.getIconClass()}`}
      style={this.getIconStyle()}
      />
    )
        if (this.backdrop) {
/*       const backDropSizeRatio = 1.56
      const backDropSize = toRem(backDropSizeRatio * this.size) */
      return (
        <span
          style={{width: "24px", height: "24px"}}
          class="backdrop"
        >
          {Icon}
        </span>
      )
    }
    return Icon
  }
}
</script>

<style lang="scss" scoped>
    .backdrop{
    display: inline-block;
    @include fc;
    justify-content: center;
    border-radius: 50%;
    &:hover{
      background: var(--round-hover-bgcolor);
    }
  }
  .icon-component{
    cursor: pointer;
  }
  .icon-color{
      &-theme {
    color: $theme-color;
  }
  &-white {
    color: $white;
  }
  &-shallow {
    color: var(--font-color-shallow-grey);
  }
  }
</style>