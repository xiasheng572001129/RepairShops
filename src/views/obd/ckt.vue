<template>
  <div class="obd-chance">
    <currentPage />
    <div class="obd-head">
      <!-- <div class="searcharea">
        <input type="text"
               v-model="input"
               placeholder="车主姓名">
        <div @click="searchgo">搜索</div>
      </div> -->
      <!-- <el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="all"></el-option>
				<el-option label="未提醒" value="before"></el-option>
				<el-option label="已提醒" value="after"></el-option>
			</el-select> -->
    </div>
    <el-table v-loading="loading"
              :data="tableData"
              :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}">
      <el-table-column width="220"
                       align="center"
                       prop="name"
                       label="车主姓名"></el-table-column>
      <el-table-column align="center"
                       prop="city"
                       label="地区"></el-table-column>
      <el-table-column align="center"
                       prop="amount"
                       label="次数"></el-table-column>
      <el-table-column align="center"
                       prop="totalFine"
                       label="金额(元)"></el-table-column>
      <el-table-column align="center"
                       prop="totalPoints"
                       label="分数"></el-table-column>
      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="details(scope.row),detailsDialogVisible=true">详情</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center"
                       prop="_fcdate"
                       label="时间"></el-table-column>
      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="remind(scope.row._flag,scope.row._obdid)">已提醒</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog title="详情"
               :visible.sync="detailsDialogVisible"
               width="30%"
               center>
      <el-form>
        <el-form-item label="姓名">
          {{detailsList.name}}
        </el-form-item>
        <el-form-item label="手机号">
          {{detailsList.phone}}
        </el-form-item>
        <el-form-item label="车牌号">
          {{detailsList.plateNumber}}
        </el-form-item>
        <el-form-item label="设备号">
          {{detailsList.eq_num}}
        </el-form-item>
        <el-form-item label="品牌/车型/排量">
          {{`${detailsList.type}/${detailsList.car_name}/${detailsList.series}`}}
        </el-form-item>
        <el-form-item label="违章行为">
          {{detailsList.detail}}
        </el-form-item>

        <el-form-item label="创建时间">
          {{detailsList.create_time}}
        </el-form-item>
      </el-form>
    </el-dialog>
    <component is='paging'
               :pageCount='pageCount'
               :currentChange='currentChange'></component>
  </div>
</template>
<script>
import currentPage from "@/views/common/currentPage.vue";
import { post } from "../../config/axios";
import paging from '@/views/common/paging'
export default {
  components: {
    currentPage,
    paging
  },

  data () {
    return {
      searchwd: '',
      seval: 'all',
      tableData: [],
      page: 1,
      input: '',
      content: '',
      pageCount: 1,
      detailsDialogVisible: false,
      loading: true,
      detailsList: []
    };
  },
  created () { },
  mounted () {
    this.Interface();
  },

  methods: {
    //封装接口-------------------------------------------
    Interface () {
      post('Wdapolicy/check', { page: this.page, search: this.input }).then(res => {
        this.loading = true;
        if (res.data.code == 1) {
          this.tableData = res.data.data.data;

          this.pageCount = res.data.data.count
          this.loading = false;
        }
        else {
          this.tableData = [];
          this.pageCount = 1;
          this.loading = false;
        }
      }).catch(res => { })
    },
    /** 分页，获取当前页数 **/
    currentChange (e) {
      this.page = e;
      this.Interface()
    },



    async details (row) {  //详情
      try {
        const res = await post('Wdapolicy/checkDetail', { id: row.id })
        this.detailsList = res.data.data
      } catch (err) {
        throw (err)
      }
    }
  },
  computed: {},
}
</script>
<style scoped lang='scss'>
/deep/ .el-form-item {
  margin-bottom: 0;
  .el-form-item__content {
    text-align: right;
  }
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

.searcharea > input,
.searcharea > div {
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
}

.searcharea > input {
  border: 1px solid #e6e6eb;
  background: #f5f5fa;
  line-height: 38px;
  color: #1e2328;
  width: 432px;
  padding: 0 24px;
}

.searcharea > div {
  background: #1ea0ff;
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
  color: #1ea0ff;
  text-decoration: underline;
}

.color-red {
  color: #fa644b;
}

.color-gray {
  color: #969ba5;
}

.color-green {
  cursor: pointer;
  color: #0acd00;
  text-decoration: underline;
}
</style>