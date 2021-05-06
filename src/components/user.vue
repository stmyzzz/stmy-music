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
import {mapState,mapActions,mapGetters} from 'vuex'
import {showConfirm} from '@/base/confirm'
import {getStore} from '@/utils'
export default {
  data(){
    return{
      hasLogin:false,
      dialogFormVisible:false,
      uid:null,
      loading:false
    }
  },
  mounted(){
    const uid = getStore("__uid__")
    if(uid !==''){
      this.uid = uid
      this.onlogin()
    }
  },
  computed:{
    ...mapState(['user','playLists']),
    ...mapGetters(['userMenus'])
  },
  methods:{
    ...mapActions(['login']),
    async onlogin(){
      this.loading = true
      const res = await this.login(this.uid)
      this.loading = false
      if(res){
        console.log('res',res)
        console.log('user',this.user)
        console.log('playlist',this.playLists);
        console.log('userMenus',this.userMenus);
      }else{
        console.log('res',res)
        showConfirm('请输入正确的id','error')
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