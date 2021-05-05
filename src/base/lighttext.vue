
<script>
export default {
  name:'LightText',
  props:['text'],
  methods:{
    getText(){
      return <span>{this.text}</span>
    }
  },
  render(){
    return this.getText()
  }
}
</script>

<style lang="scss" scoped>

</style>