<template>
  <div class="user">
    <div v-if="!haslogin" @click="logindialog = true" class="no_login">
      <i class="user-icon iconfont icon-yonghu"></i>
      <p>未登录</p>
    </div>

    <div @click="onlogout()" class="no_login" v-else>
      <img class="avatar_img" v-lazy="user.avatarUrl" src="" alt="">
      <p>{{user.nickname}}</p>
    </div>

    <el-dialog
    :modal="false"
    title="登录" 
    :visible.sync="logindialog" 
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
      logindialog:false,
      uid:null,
      loading:false
    }
  },
  mounted(){
    const uid = getStore("__uid__")
    if(uid !==null){
      this.uid = uid
      this.onlogin()
    }
  },
  computed:{
    ...mapState(['user','playLists']),
    ...mapGetters(['userMenus','haslogin'])
  },
  methods:{
    ...mapActions(['login','logout']),
    async onlogin(){
      this.loading = true
      const res = await this.login(this.uid)
      this.loading = false
      this.logindialog = false
      if(res){
        console.log('res',res)
        console.log('user',this.user)
        console.log('playlist',this.playLists);
        console.log('userMenus',this.userMenus);
      }else{
        console.log('res',res)
        showConfirm('请输入正确的id','error')
      }
    },
    onlogout(){
      showConfirm('确定要退出吗',()=>{
        console.log('logout');
        this.logout()
      })
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
      .avatar_img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    
  }
  .el-dialog{
      background: var(--modal-bg-color) !important;    
    }
</style>