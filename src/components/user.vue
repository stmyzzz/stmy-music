<template>
  <div class="user">
    <div @click="dialogFormVisible = true" class="no_login">
      <i class="user-icon iconfont icon-yonghu"></i>
      <p>未登录</p>
    </div>

    <el-dialog
    :modal="false"
    title="登录" 
    :visible.sync="dialogFormVisible" 
    width='30%'>
      <el-input
        class="input"
        placeholder="请输入您的网易云uid"
        v-model="uid"
      />
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" :loading="loading" @click="onlogin">登录</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      hasLogin:false,
      dialogFormVisible:false,
      uid:null,
      loading:false
    }
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    ...mapActions(['login']),
    async onlogin(){
      const res = await this.login(this.uid)
      if(res){
        console.log('res',res)
        console.log('user',this.user)              
      }else{
        console.log('fail');
      }
  
      

    }
  }
}
</script>

<style lang="scss" scoped>
  .user{
    .no_login{
      display: flex;
      align-items: center;
      padding: 15px 20px;
      color: var(--font-color);
      font-size: 16px;
      cursor: pointer;
      .user-icon{
        font-size: 20px;
      }
      p{
        margin-left: 20px;
      }
    }
    
  }
  .el-dialog{
      background: var(--modal-bg-color) !important;    
    }
</style>