<template>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="15%"
  :modal="false">
  <span>{{title}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirmClose">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import Vue from 'vue'

const confirm =  {
  name:'confirm',
  methods:{
    confirmClose(){
      this.onconfirm() && this.onconfirm
      this.dialogVisible = false
    },
  }
} 
export default confirm
const confirmConstrutor = Vue.extend(confirm)
export const showConfirm = function(title,text,onconfirm = () =>{}){
  if(typeof text === 'function'){
    onconfirm = text
    text = undefined
  }
  const confirmDOM = new confirmConstrutor({
    el:document.createElement('div'),
    data(){
      return {
        text:text,
        title:title,
        dialogVisible:true,
        onconfirm
      }
    }
  });
document.body.appendChild(confirmDOM.$el)
}  

</script>

<style lang="scss" scoped>

</style>