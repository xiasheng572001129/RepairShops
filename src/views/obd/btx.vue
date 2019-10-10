<template lang="html">
  <div class="obd-chance">
		<currentPage :id='214'/>
		<div class="obd-head">
			<!-- <div class="searcharea">
				<input type="text" v-model="input"  placeholder="车牌号/姓名">
				<div @click="searchgo">搜索</div>
			</div> -->
			<!-- <el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="all"></el-option>
				<el-option label="未提醒" value="before"></el-option>
				<el-option label="已提醒" value="after"></el-option>
			</el-select> -->
		</div>
		<el-table  v-loading="loading" :data="tableData" :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}">
			<el-table-column align="center" prop="plate" label="车牌号"></el-table-column>
			<el-table-column align="center" prop="title" label="内容"></el-table-column>
			<el-table-column align="center" prop="create_time" label="时间"></el-table-column>
			<el-table-column align="center" prop="car_name" label="车型"></el-table-column>
			<el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <p v-if="scope.row.type == 1">保单</p>
          <p v-if="scope.row.type == 2">养护</p>
          <p v-if="scope.row.type == 3">故障</p>
        </template>
      </el-table-column>
			<el-table-column align="center" prop="phone" label="手机号"></el-table-column>
			<el-table-column align="center" label="查看详情">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" plain size="mini" @click="remind(scope.row)">提醒</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="保单内容"	:visible.sync="centerDialogVisible1"	width="70%"	center>
      <el-table :data="[bdData]">
        <el-table-column property="eq_num" label="设备号" align="center"></el-table-column>
        <el-table-column property="plate" label="车牌号" align="center"></el-table-column>
        <el-table-column property="title" label="标题" align="center"></el-table-column>
        <el-table-column property="p_create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column property="name" label="车主名" align="center"></el-table-column>
        <el-table-column property="car_name" label="品牌" align="center"></el-table-column>
        <el-table-column property="type" label="车型" align="center"></el-table-column>
        <el-table-column property="series" label="排量" align="center"></el-table-column>
      </el-table>
      <br />
      <br />
      <br />
      <el-table :data="[bdData]">
        <el-table-column property="phone" label="手机号" align="center"></el-table-column>
        <el-table-column property="company" label="保险公司" align="center"></el-table-column>
        <el-table-column property="policy_num" label="保单号" align="center"></el-table-column>
        <el-table-column property="total" label="保单金额" align="center"></el-table-column>
        <el-table-column property="start_time" label="保单开始时间" align="center"></el-table-column>
        <el-table-column property="end_time" label="保单结束时间" align="center"></el-table-column>
        <el-table-column property="" label="险种" align="center">
          <el-table-column property="" label="" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.name_price">{{item.type}}</p>
            </template>
          </el-table-column>
          <el-table-column property="" label="" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.name_price">{{item.value}}</p>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column property="pc_img" label="图片">
          <template slot-scope="scope">
              <p v-for="img in scope.row.pc_img"><img :src="img" :preview="img" class="preview-img" alt=""></p>
          </template>0
        </el-table-column>
        <el-table-column property="violation" label="违章次数" align="center"></el-table-column>
        <el-table-column property="speed" label="异常行为次数" align="center"></el-table-column>
        <el-table-column property="km" label="行驶总里程" align="center"></el-table-column>
      </el-table>
    </el-dialog>
		<el-dialog title="养护内容"	:visible.sync="centerDialogVisible2"	width="60%"	center>
      <el-table :data="[yhData]">
        <el-table-column property="eq_num" label="设备号" align="center"></el-table-column>
        <el-table-column property="plate" label="车牌号" align="center"></el-table-column>
        <el-table-column property="title" label="标题" align="center"></el-table-column>
        <el-table-column property="p_create_time" label="时间" align="center"></el-table-column>
        <el-table-column property="name" label="姓名" align="center"></el-table-column>
        <el-table-column property="car_name" label="品牌" align="center"></el-table-column>
        <el-table-column property="type" label="车型" align="center"></el-table-column>
        <el-table-column property="series" label="排量" align="center"></el-table-column>
        <el-table-column property="phone" label="手机号" align="center"></el-table-column>
        <el-table-column property="km" label="系统设定里程" align="center"></el-table-column>
      </el-table>
    </el-dialog>
		<el-dialog title="故障内容"	:visible.sync="centerDialogVisible3"	width="60%"	center>
      <el-table :data="[gzData]">
        <el-table-column property="eq_num" label="设备号" align="center"></el-table-column>
        <el-table-column property="plate" label="车牌号" align="center"></el-table-column>
        <el-table-column property="title" label="内容" align="center"></el-table-column>
        <el-table-column property="p_create_time" label="时间" align="center"></el-table-column>
        <el-table-column property="name" label="车主姓名" align="center"></el-table-column>
        <el-table-column property="car_name" label="品牌" align="center"></el-table-column>
        <el-table-column property="type" label="车型" align="center"></el-table-column>
        <el-table-column property="series" label="排量" align="center"></el-table-column>
        <el-table-column property="phone" label="手机号" align="center"></el-table-column>
      </el-table>
    </el-dialog>

		<component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
	</div>
</template>

<script>
import currentPage from "@/views/common/currentPage.vue";
import { post } from "../../config/axios";
import paging from '@/views/common/paging'
export default {
  components:{
    currentPage,
    paging
  },

  data() {
    return {
      searchwd: '',
      seval: 'all',
      tableData: [],
      page:1,
      input:'',
      content:'',
      pageCount:1,
      centerDialogVisible1:false,
      centerDialogVisible2:false,
      centerDialogVisible3:false,
      loading:true,
      bdData: [],
      yhData: [],
      gzData: [],

    };
  },
  created() {
    this.$preview.on('imageLoadComplete',(e,item)=>{
      this.$preview.self.template.style.zIndex = 999999;
    })
  },
  mounted() {
    this.Interface();
  },

  methods: {
    //封装接口-------------------------------------------
    Interface(){
      post('Wdapolicy/alterList',{page:this.page}).then(res=>{
      this.loading = true;
      if (res.data.code==1) {
        this.tableData = res.data.data.list;
        this.pageCount = res.data.data.rows
        this.loading = false;
      }
      else{
        this.tableData = [];
        this.pageCount = 1;
        this.loading = false;
      }
    }).catch(res=>{})
    },
    /** 分页，获取当前页数 **/
    currentChange(e){
      this.page=e;
      this.Interface()
    },
        //-----------------------------------------------------
    handleClick(e){
      var json = {
        id: e.id,
        type: e.type
      }
      switch (e.type) {
        case 1: //保单
          this.centerDialogVisible1 = true;
          post('Wdapolicy/policyDetail',json).then(res=>{
            if(res.data.code){
              this.bdData = res.data.data;
              this.$previewRefresh()
            }
          })
          break;
        case 2: //养护
          this.centerDialogVisible2 = true;
          post('Wdapolicy/maintainDetail',json).then(res=>{
            if(res.data.code){
              this.yhData = res.data.data;
            }
          })
          break;
        case 3: //故障
          this.centerDialogVisible3 = true;
          post('Wdapolicy/faultDetail',json).then(res=>{
            if(res.data.code){
              this.gzData = res.data.data;
            }
          })
          break;
      }
    },

    /** 搜索 **/
    searchgo() {
      this.loading = true;
      this.page = 1;
      this.Interface();
    },
    /** 提醒 **/
    remind(e){
      var type = e.type;
      this.$confirm('是否提醒?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          switch (type) {
            case 1: //保单
              post('Wdapolicy/conserveHandle',{
                id: e.id
              }).then(res=>{
                if(res.data.code){
                  this.$message.success(res.data.msg);
                }
              })
              break;
            case 2: //养护
              post('Wdapolicy/curHandle',{
                id: e.id
              }).then(res=>{
                if(res.data.code){
                  this.$message.success(res.data.msg);
                }
              })
              break;
            case 3: //故障
              post('Wdapolicy/handle',{
                flagId: e.flagId,
                id: e.id
              }).then(res=>{
                if(res.data.code){
                  this.$message.success(res.data.msg);
                }
              })
              break;
          }
        }).catch(()=>{});

    }

  },
  computed: {},
}
</script>

<style lang="css" scoped>
.pswp{
  z-index: 10000 !important;
}
.obd-head {
  height: 70px;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.searcharea {
  display: flex;
  margin-left: 40px;
  margin-right: 30px;
}

.searcharea>input,
.searcharea>div {
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
}

.searcharea>input {
  border: 1px solid #E6E6EB;
  background: #F5F5FA;
  line-height: 38px;
  color: #1E2328;
  width: 432px;
  padding: 0 24px;
}

.searcharea>div {
  background: #1EA0FF;
  line-height: 40px;
  width: 120px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.widlimit {
  width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flexrow {
  display: flex;
  align-items: center;
}

.color-blue {
  cursor: pointer;
  color: #1EA0FF;
  text-decoration: underline;
}

.color-red {
  color: #FA644B;
}

.color-gray {
  color: #969BA5;
}

.color-green {
  cursor: pointer;
  color: #0ACD00;
  text-decoration: underline;
}
</style>
