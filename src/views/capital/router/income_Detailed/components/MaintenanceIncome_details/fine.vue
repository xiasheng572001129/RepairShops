<template>
  <div class='activity_reward'>
    <div class='table'>
      <el-table :data="tableData"
                style="width: 100%"
                :max-height="screenHeight">
        <el-table-column label="保险公司"
                         prop="company"
                         align="center"></el-table-column>

        <el-table-column label="车型"
                         prop="type"
                         align="center"></el-table-column>
        <el-table-column label="车牌号"
                         prop="plate"
                         align="center"></el-table-column>

        <el-table-column label="金额"
                         prop="fine"
                         align="center"></el-table-column>
        <el-table-column label="时间"
                         prop="create_time"
                         align="center"></el-table-column>
        <el-table-column label="驳回理由"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="scope.row.reason">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{scope.row.reason}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="policyImgVisible=true,policyImgList=scope.row.pc_img,policyImgDetails()">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <component is='paging'
               :pageCount='pageCount'
               :currentChange='currentChange'></component>
    <!-- 保单图片 -->
    <el-dialog title="保单图片"
               center
               :visible.sync="policyImgVisible">
      <div>
        <img v-for="(item,index) in policyImgList"
             :key="index"
             width="200px"
             height="200px"
             style="margin-right:10px"
             :src="item"
             ref="policyImg" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getFine_record } from '@/server/serverData'
import paging from '@/views/common/paging'
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
export default {
  data () {
    return {
      currentPage: 1, //当前页
      pageCount: 1, //总页数
      tableData: [],
      screenHeight: window.innerHeight - 370,
      detailsDialogVisible: false,
      policyImgVisible: false,
      policyImgList: []
    }
  },
  components: {
    paging
  },
  methods: {
    /** 活动奖励列表 **/
    async init () {
      try {
        let res = await getFine_record(
          {
            page: this.currentPage
          }
        )
        if (res.data.code == 1) {
          console.log(res)
          this.tableData = res.data.data.list
          this.pageCount = res.data.data.rows;

        } else {
          this.tableData = []
          this.pageCount = 1
        }
      } catch (err) {
        console.log(err)
      }
    },
    policyImgDetails () {  //保单图片详情
      this.$nextTick(() => {
        const policyImg = this.$refs.policyImg
        if (policyImg && policyImg.length > 0) {
          policyImg.forEach(item => {
            new Viewer(item)
          })
        }

      })
    },

    currentChange (e) {
      this.currentPage = e;
      this.init()
    }
  },
  mounted () {
    this.init()
    var that = this
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight - 370
      })()
    }
  }
}
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.form {
  /deep/ .el-form-item__content {
    .el-input-group__append,
    .el-input-group__prepend {
      border: none;
      background-color: #3498e9;
      color: white;
      padding: 0 30px;
    }
  }
  .search {
    margin-right: 40px;
  }
}
.table {
  /deep/ .el-table th,
  .el-table tr {
    background-color: #d7e1e6;
    .ellipsis {
      width: 120px;
      height: 100%;
      line-height: 100%;
      font-size: 12px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.total {
  padding: 30px 80px;
}
.paging {
  text-align: center;
  margin-top: 30px;
}
.details {
  span {
    min-height: 200px;
    display: inline-block;
  }
}
</style>
