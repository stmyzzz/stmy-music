<template>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="10%"
  :modal="false">
  <span>{{text}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import Vue from 'vue'

const confirm =  {
  name:'confirm',
  methods:{
    confirmClose(){
      this.dialogVisible = false
    },
  }
} 
export default confirm
const confirmConstrutor = Vue.extend(confirm)
export const showConfirm = function(text,title){
  const confirmDOM = new confirmConstrutor({
    el:document.createElement('div'),
    data(){
      return {
        text:text,
        title:title,
        dialogVisible:true
      }
    }
  });
document.body.appendChild(confirmDOM.$el)
}  

</script>

<style lang="scss" scoped>

</style>