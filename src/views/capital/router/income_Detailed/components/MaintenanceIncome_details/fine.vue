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
        <el-table-column label="审核状态"
                         align="center">

          <template slot-scope="scope">
            <div v-if="scope.row.if_amend">
              {{scope.row.status==0 ? '审核中' : scope.row.status==1 ? '已通过' :'已驳回'}}
            </div>
            <div v-else>---</div>

          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="policyImgVisible=true,policyImgList=scope.row.pc_img,policyImgDetails()">详情</el-button>
            <el-button type="text"
                       :disabled="!scope.row.if_amend==0"
                       @click="Modify(scope.row)">修改</el-button>
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
  </div>
</template>
<script>
import { getFine_record, policyType, GetCompany, updatePloicy, putPolicy } from '@/server/serverData'
import paging from '@/views/common/paging'
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('token'),
      currentPage: 1, //当前页
      pageCount: 1, //总页数
      tableData: [],
      screenHeight: window.innerHeight - 370,
      detailsDialogVisible: false,
      policyImgVisible: false,
      policyImgList: [],
      fileList: [], //默认显示上传的投保图片
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
      uploadLoading: false, //上传loading
      policyVisible: false,
      magnifyImgVisible: false, //图片放大弹框显示状态
      instanceVisible: false,
      magnifyImageUrl: '', //需要发大的图片
      insuredType: [], //投保类型列表
      companyList: [], //保险公司列表
      PolicyList: {}
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
    async Modify (item) {  //修改
      try {
        this.policyVisible = true
        const res = await putPolicy({
          uid: item.uid,
          cid: item.cid,
        })
        this.policyData = res.data.data || this.policyData
        this.getCompany(item)
        this.defaultInsuredType(this.policyData.policy_type)
        this.fileList = this.policyData.pc_img && this.policyData.pc_img.length > 0 && this.policyData.pc_img.map(item => {
          return Object.assign({}, { url: item })
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
    //默认投保类型
    defaultInsuredType (defaultType) {

      try {    //获取投保类型列表
        this.policyTypeList().then(res => {
          let insuredType = res

          insuredType.forEach(item => {
            if (defaultType && defaultType.length > 0 && defaultType.includes(item.type)) {
              item = Object.assign(item, { checked: true })
            } else {
              item = Object.assign(item, { checked: false })
            }

          })
          this.insuredType = insuredType || []

        })
        // this.insuredType = res.data.data || []
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
    //获取保险公司列表
    async getCompany (item) {
      try {
        const res = await GetCompany({
          sid: item.sid
        })
        this.companyList = res.data.data || []
      } catch (error) {
        throw (error)
      }
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
        return item == (res.response || res.url)
      })
      this.policyData.pc_img.splice(index, 1)
    },
    async upload () {  //修改保单

      try {
        this.uploadLoading = true
        const res = await updatePloicy(Object.assign(this.policyData, { sid: this.policyData.sid, uid: this.policyData.uid, cid: this.policyData.cid }))
        this.uploadLoading = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.policyVisible = false
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.uploadLoading = false
        throw (error)
      }
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

.insuredType {
  //保单类型
  margin: 0 10px 10px 0;
}
.el-Width {
  width: 55%;
}
</style>
