<template>
  <div class="member">
    <div class="viewMain">
      <div class="secondBody">

        <el-table :data="tableData"
                  style="margin-top:20px"
                  :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
          <el-table-column prop="plate"
                           label="车牌号"
                           align="center">
          </el-table-column>
          <el-table-column prop="sale_time"
                           label="申请保养时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="company"
                           label="保险公司"
                           align="center">
          </el-table-column>
          <el-table-column prop="policy_num"
                           label="保单号"
                           align="center">
          </el-table-column>
          <el-table-column prop="start_time"
                           label="开始时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="end_time"
                           label="结束时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="policy_money"
                           label="保单金额"
                           align="center">
          </el-table-column>
          <el-table-column label="投保类型"
                           align="center">
            <template slot-scope="scope">
              <el-popover placement="top-start"
                          width="400"
                          trigger="hover"
                          :content="scope.row.policy_type.join(' 、')">
                <el-button type="text"
                           slot="reference">详情</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="保单图片"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="policyImg(scope.row.pc_img)">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="small"
                         @click="audit(scope.row)"
                         :loading="loading">审核</el-button>
              <el-button type="primary"
                         size="small"
                         @click="policyVisible=true,Modify(scope.row)">修改保单</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 保单图片详情 -->
        <el-dialog title="保单图片详情"
                   center
                   width="30%"
                   :visible.sync="policyImgVisible">
          <div class="policyImgList"
               ref="policyImg">
            <img v-for="(item,index) in policyImgList"
                 :key="index"
                 :src="item" />
          </div>
        </el-dialog>
        <!-- 修改保单 -->
        <el-dialog title="修改保单"
                   center
                   :visible.sync="policyVisible"
                   @close='()=>{
                   $refs.form.resetFields();
                   $refs.upload.clearFiles()
               }'>
          <el-form :model="policyData"
                   label-width="100px"
                   style="width:60%"
                   ref="form">
            <el-form-item label="客户类型: "
                          prop="pid">
              <el-select v-model="policyData.pid"
                         placeholder="请选择保险公司"
                         class="el-Width">
                <el-option v-for="(item,index) in companyList"
                           :key="index"
                           :label="item.company"
                           :value="item.id">{{item.company}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保单号: "
                          prop="policy_num">
              <el-input placeholder="请输入保单号"
                        v-model="policyData.policy_num"
                        class="el-Width" />
            </el-form-item>
            <el-form-item label="投保金额: "
                          prop="policy_money">
              <el-input placeholder="请输入投保金额"
                        v-model="policyData.policy_money"
                        class="el-Width" />
            </el-form-item>
            <el-form-item label="投保开始时间: "
                          prop="start_time">
              <el-date-picker v-model="policyData.start_time"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择投保开始时间"
                              class="el-Width">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="投保结束时间: "
                          prop="end_time">
              <el-date-picker v-model="policyData.end_time"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择投保结束时间"
                              class="el-Width">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="投保类型: "
                          prop="policy_type">
              <el-button v-for="(item,index) in insuredType"
                         :key="index"
                         :type="item.checked ? 'primary' : ''"
                         class="insuredType"
                         @click="chooseInsuredType(index)">{{item.type}}</el-button>

            </el-form-item>
            <el-form-item label="投保图片: "
                          prop="pc_img">

              <el-upload :action="uploadUrl"
                         list-type="picture-card"
                         :limit="3"
                         name="image"
                         :data="{token}"
                         :file-list="fileList"
                         :on-preview="handlePictureCardPreview"
                         :on-success="handlePictureCardSuccess"
                         :on-remove="handleRemove"
                         ref="upload">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="magnifyImgVisible"
                         append-to-body>
                <img width="100%"
                     :src="magnifyImageUrl"
                     alt="">
              </el-dialog>
              <div style="color:red">上传说明: (含: 车前照、行驶证、保单照片、图片大小不能超过2M)</div>
              <div style="color:red;line-height:20px">
                1、不符合要求的车辆系统每单自动扣除维修厂120元
              </div>
              <div style="color:red;line-height:20px">
                2、保单信息确保清晰，一经上传，系统不可修改
              </div>
              <div style="color:red;cursor:pointer"
                   @click="instanceVisible=true,examineShoot()">查看拍摄实例(请上传清晰的保单图片)</div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         :loading="uploadLoading"
                         @click="upload">上传</el-button>
            </el-form-item>
          </el-form>
          <el-dialog title="示例"
                     center
                     :visible.sync="instanceVisible"
                     append-to-body>
            <div class="instance">
              <img ref="license"
                   src="../images/license.png"
                   width="200px"
                   height="200px" />
              <img ref="plate"
                   src="../images/plate.png"
                   width="200px"
                   height="200px" />
              <img ref="policy"
                   src="../images/policy.png"
                   width="200px"
                   height="200px" />
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination class="page"
                       background
                       layout="prev, pager, next"
                       @current-change="getListData"
                       :current-page.sync="currentPage"
                       :page-count='PageCount'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { policyAuditList, checkPolicy, updatePloicy, GetCompany, policyType } from "@/server/serverData";
export default {
  data () {
    return {
      sid: window.localStorage.getItem('sid'), //维修厂id
      token: window.localStorage.getItem('token'),
      // 车牌号关键字
      keyword: "",
      // 当前页
      currentPage: 0,
      // 总页数
      PageCount: 1,
      // 表格数据
      tableData: [],
      // 右小角总数
      total: "",
      // 选择完成的时间

      // intervalTime: [
      //   new Date().getTime() - 3600 * 1000 * 24 * 7,
      //   new Date().getTime()
      // ],

      policyImgVisible: false, //保单图片详情
      policyVisible: false, //修改保单
      policyImgList: [], //保单图片
      loading: false, //审核loading
      policyData: {  //上传保单的内容
        cid: '', //卡id
        sid: '', //维修厂id
        uid: '', //用户id  
        pid: '', //保险公司id
        policy_num: '',  //保单号
        policy_money: '',  //投保金额
        start_time: '', //投保开始时间
        end_time: '',  //投保结束时间
        policy_type: [], //投保类型
        pc_img: [], //投保图片
      },
      insuredType: [],
      companyList: [],
      fileList: [],
      magnifyImgVisible: false,
      magnifyImageUrl: '',
      instanceVisible: false,
      uploadLoading: false
    };
  },
  methods: {
    dataChange () {
      this.getListData();
    },
    async getListData () {

      let res = await policyAuditList({ sid: this.sid, page: this.currentPage });
      if (res.data.code == 1) {

        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
        this.PageCount = res.data.data.rows
      } else {
        this.tableData = [];
        this.PageCount = 1;
        this.total = res.data.data.total;
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 保单图片详情
    policyImg (img) {
      this.policyImgVisible = true
      this.policyImgList = img || []
      this.$nextTick(() => {
        new Viewer(this.$refs.policyImg)
      })
    },
    //获取保险公司列表
    async getCompany () {
      try {
        const res = await GetCompany({
          sid: this.sid
        })
        this.companyList = res.data.data || []
      } catch (error) {
        throw (error)
      }
    },
    policyTypeList () {  //投保类型列表

      return new Promise(async (resolve, reject) => {
        try {
          const res = await policyType()
          resolve(res.data.data || [])
        } catch (error) {
          reject(error)
        }
      })
    },
    defaultPolicyType () {
      try {    //获取投保类型列表
        this.policyTypeList().then(res => {
          let insuredType = res
          insuredType.forEach(item => {
            this.policyData.policy_type.forEach((el) => {
              if (item.type == el) {
                item = Object.assign(item, { checked: true })
              } else {
                item = Object.assign(item, { checked: false })
              }
            })
          })
          this.insuredType = insuredType || []
        })
      } catch (error) {
        throw (error)
      }
    },
    //选择投保类型
    chooseInsuredType (index) {
      this.insuredType[index].checked = !this.insuredType[index].checked
      let insuredType = []
      this.insuredType.filter(item => {
        return item.checked
      }).forEach(item => {
        insuredType.push(item.type)
      })
      this.policyData.policy_type = insuredType
    },
    handlePictureCardPreview (res) {
      this.magnifyImageUrl = res.url
      this.magnifyImgVisible = true
    },
    //上传投保图片 成功
    handlePictureCardSuccess (res) {
      this.policyData.pc_img.push(res)
    },
    //删除投保图片 
    handleRemove (res) {
      let index = this.policyData.pc_img.findIndex(item => {
        return item == res.response
      })
      this.policyData.pc_img.splice(index, 1)
    },
    //查看拍摄实例
    examineShoot () {
      this.$nextTick(() => {
        const { license, plate, policy } = this.$refs;
        let arr = [license, plate, policy]
        arr.forEach(item => {
          new Viewer(item)
        })
      })
    },
    Modify (item) {  //修改保单
      console.log(item)
      this.$nextTick(() => {
        this.policyData = Object.assign({}, item, { pid: item.company })
        this.fileList = this.policyData.pc_img.map(item => {
          return { url: item }
        })
        this.defaultPolicyType()
      })
    },
    async upload () {  //上传保单
      try {
        this.uploadLoading = true
        const res = await updatePloicy(Object.assign({}, this.policyData, { cid: this.policyData.id }))
        this.uploadLoading = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.policyVisible = false
          this.auditPolicyVisible = false
          this.getListData()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.uploadLoading = false
        throw (error)
      }
    },
    //保单审核
    audit (item) {
      this.$confirm('此操作将审核保单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          const res = await checkPolicy({
            sid: this.sid,
            uid: item.uid,
            cid: item.id
          })
          this.loading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.getListData()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.loading = false
          throw (error)
        }

      }).catch(() => { });
    }
  },
  mounted () {
    this.getListData();
    this.getCompany()
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-input-group__append,
.el-input-group__prepend {
  background-color: #3498e9;
  border: none;
  color: white;
}
.member {
  min-height: calc(100vh - 105px);
  background-color: #ebedf0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 100px;
  overflow: hidden;
  .viewMain {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    .secondBody {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #fff;
      border-top: 2px solid #b9c3cd;

      .filterCondition {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
      }
      .altogether {
        margin-top: 30px;
        height: 30px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 50px;
        line-height: 30px;
      }
      .page {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.col-32373C {
  color: #32373c;
}
.col-64696e {
  columns: #64696e;
}
.col-FF2828 {
  color: #ff2828;
}
.policyImgList {
  width: 100%;
  img {
    margin: 0 10px;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }
}
</style>
<style>
.el-breadcrumb__inner {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
}
.el-breadcrumb__inner.is-link {
  color: #3498e9;
}
</style>


