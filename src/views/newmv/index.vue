<template>
  <div class="index">
    <div class="TabArr">
      <div class="areaTab">
        <span>地区：</span>
        <Tabs :tabs="areaTabs" @tabChange="tabChange" v-model="areaActiveIndex" ></Tabs>
      </div>

          <div class="areaTab">
        <span>类型：</span>
        <Tabs :tabs="typeTabs" @tabChange="tabChange"  v-model="typeActiveIndex" ></Tabs>
      </div>

          <div class="areaTab">
        <span>排序：</span>
        <Tabs :tabs="sortTabs" @tabChange="tabChange"  v-model="sortActiveIndex" ></Tabs>
      </div>      
    </div>
    <mv-card :mvData="mvData"></mv-card>
    <el-pagination
        :current-page.sync="currentPage"
        :page-size="40"
        :total="mvCount"
        @current-change="onPageChange"
        layout="prev, pager, next"
          >
    </el-pagination> 
  </div>
</template>

<script>
import Tabs from '@/components/tabs'
import MvCard from './MvCard'
import {MvAll} from '@/api'
const areaTabs = ["全部", "内地", "港台", "欧美", "日本", "韩国"]
const typeTabs = ["全部", "官方版", "原声", "现场版", "网易出品"]
const sortTabs = ["上升最快", "最热", "最新"]
export default {
  name:'newmv',
  data(){
    return {
      areaActiveIndex:0,
      typeActiveIndex:0,
      sortActiveIndex:0,
      mvData:[],
      currentPage:0,
      mvCount:0
    }
  },
  created(){
    this.areaTabs = areaTabs
    this.typeTabs = typeTabs
    this.sortTabs = sortTabs
    this.getMv()
  },
  components:{
    Tabs,
    MvCard
  },
  computed:{
    MvParams:function(){
      return {
      area : areaTabs[this.areaActiveIndex],
      order : sortTabs[this.typeActiveIndex],
      type :  typeTabs[this.sortActiveIndex],
      limit:40,
      offset:this.getPageOffset(this.currentPage,40)
      }
    },
    MvTotal:function(){
      return {
      area : areaTabs[this.areaActiveIndex],
      order : sortTabs[this.typeActiveIndex],
      type :  typeTabs[this.sortActiveIndex],
      }
    }
  },
  methods:{
    tabChange(){
      console.log('12');
      this.currentPage = 0
      this.getMv()
    },
    getPageOffset(page,limit){
      return (page - 1)*limit
    },
    async getMv(){
      let mvtotal = await MvAll(this.MvTotal)
      let mv = await MvAll(this.MvParams)
      console.log('mvtotal',mvtotal.count);
      const {count} = mvtotal
      const {data} = mv
      this.mvData = data
      this.mvCount = count
    },
    onPageChange(page){
      console.log(page);
      this.currentPage = page
      this.getMv()
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  margin: 20px 130px;
}
  .areaTab{
    display: flex;
    align-items: center;
    margin: 10px 0px;
    padding: 5px 0px;
  }
          .el_page{
          width: 100%;
        }
</style>