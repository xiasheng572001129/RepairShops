<template>
  <div class="maintain">
    <div class="viewMain">
      <h2 class="col-32373C">邦保养服务</h2>
      <div class="whiteBlock">
        <div class="searchBox">
          <input type="text"
                 v-model="form.plate"
                 @input="getRecord"
                 placeholder="输入车牌号">
          <div class="recordBox"
               v-if="plateRecord.length!=0">
            <p v-for="(item,index) in plateRecord"
               @click="selectPlate(item)"
               :key="index">{{item}}</p>
          </div>
          <button @click="search">查找</button>
          <img class="plateImg"
               :src="carInfo && carInfo.car_pic"
               alt
               v-if="carInfo && carInfo.car_pic"
               title="车牌照片">
          <button style="margin-left:20px"
                  v-if="carInfo && carInfo.name && carInfo.if_policy==2 && carInfo.put_policy==1"
                  @click="openUpload()">上传保单</button>
          <!-- <button style="margin-left:20px"
                  v-if="carInfo && carInfo.name && carInfo.if_policy==2 && carInfo.put_policy==2"
                  @click="auditPolicy()">审核保单</button> -->
        </div>
        <div class="carInfo"
             v-if="carInfo && carInfo.name">
          <div class="card">
            <table class="infoTabal">
              <tr>
                <td>车型：</td>
                <td>{{carInfo.type}}</td>
                <td>建议保养里程：</td>
                <td>{{carInfo.km}}</td>
              </tr>
              <tr>
                <td>用户名：</td>
                <td>{{carInfo.name}}</td>
                <td>物料型号：</td>
                <td>
                  <!-- {{carInfo.remain_times}} -->
                  --
                </td>
              </tr>
              <tr>
                <td>联系方式：</td>
                <td>{{carInfo.phone}}</td>
                <td>使用数量：</td>
                <td>{{carInfo.litre}}</td>
              </tr>
              <tr>
                <td>建议保养周期：</td>

                <td>{{carInfo.month}}</td>
                <td>服务费<span v-if="carInfo.free!=2"
                        style="font-size:14px">(含机滤)</span>：</td>
                <td>{{` ${parseInt(carInfo.hour_charge)+parseInt(carInfo.filter)}  元`}}</td>
              </tr>
              <tr>
                <td colspan='4'
                    style="text-align:center;color:red"><b>推荐用油：{{carInfo.oil}}</b></td>
                <!-- <td colspan='4'
            style="text-align:center">物料名称：{{carInfo.oil}}</td> -->

              </tr>
            </table>
            <span class="col-32373C">
              此卡剩余次数：{{carInfo.remain_times}}次
              <span v-if="carInfo.msgs">（{{carInfo.msgs}}）</span>

            </span>
          </div>
          <el-form class="elForm"
                   ref="form"
                   :model="form"
                   label-width="120px">
            <el-form-item label="施工图片"
                          v-if="carInfo.free==2">
              <el-upload :action="uploadUrl"
                         list-type="picture-card"
                         :limit="1"
                         name="image"
                         :data="{token}"
                         :on-success="constructionSuccess"
                         :on-remove="constructionRemove"
                         ref="upload">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="constructionInstance"
                   @click="viewConstructionImg()">
                示例
              </div>
            </el-form-item>
            <el-form-item v-if="carInfo.free==2">
              <div style="color:red">
                需清晰上传施工照
              </div>
            </el-form-item>
            <el-form-item label="上次养护里程"
                          v-if="carInfo.last_mileage">
              <span>{{carInfo.last_mileage+'公里'}}</span>
            </el-form-item>
            <el-form-item label="本次养护里程">
              <el-input v-model="form.the_mileage"
                        placeholder="输入本次保养里程（公里）"
                        min="0"
                        type="number"
                        @keyup.native="mileageRule"></el-input>
            </el-form-item>
            <el-form-item label
                          v-if="form.the_mileage != ''">
              <span style="color: #606266;">下次保养里程：{{nextMileage}}公里</span>
            </el-form-item>
            <el-form-item label="确认码">
              <el-input placeholder="输入用户确认码"
                        v-model="form.code"
                        type="number">
                <el-button slot="append"
                           @click="sendCode"
                           :disabled="disabled"
                           style="width: 120px;">{{time}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         class="submit"
                         v-show='carInfo.free==2 && carInfo.pay_money>0'
                         @click="pay()"
                         :loading="PayLoading">支付</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         class="submit"
                         @click="submitForm"
                         :loading="submitLoading">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <span class="col-32373C"
              v-else>输入车牌号查找邦保养用户信息</span>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               width="1000px"
               :before-close="complate">
      <div class="serveDialog">
        <img src="../images/serveEnd.png"
             alt>
        <span class="col-32373C">{{Tips}}</span>
        <el-button type="primary"
                   @click="complate">好的</el-button>
      </div>
    </el-dialog>
    <!-- 扫码支付金额 -->
    <el-dialog :title="PayCode.title"
               center
               :visible.sync="PayVisible">

      <div v-show='PayCode'
           class="Paycode">
        <h1>{{PayCode.bottom}}</h1>
        <h2>{{PayCode.detail}}</h2>
        <p>
          <img :src="PayCode.src">
        </p>
        <el-button type="primary"
                   @click="confirmPay"
                   :loading="PayStatus">确定</el-button>
      </div>
    </el-dialog>
    <!-- 上传保单 -->
    <el-dialog title="上传保单"
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
    <!-- 审核保单 -->
    <el-dialog title="审核保单"
               center
               :visible.sync="auditPolicyVisible">
      <el-form label-width="100px">
        <el-form-item label="保险公司: ">
          {{PolicyList.company}}
        </el-form-item>
        <el-form-item label="保单号: ">
          {{PolicyList.policy_num}}
        </el-form-item>
        <el-form-item label="投保开始时间: ">
          {{PolicyList.start_time}}
        </el-form-item>
        <el-form-item label="投保结束时间: ">
          {{PolicyList.end_time}}
        </el-form-item>
        <el-form-item label="保单金额: ">
          {{PolicyList.policy_money}}元
        </el-form-item>
        <el-form-item label="保单险种: ">
          {{PolicyList.policy_type && PolicyList.policy_type.length> 0 ? PolicyList.policy_type.join('、') : ''}}
        </el-form-item>
        <el-form-item label="保单图片: ">
          <img v-for="(item,index) in PolicyList.pc_img"
               :src="item"
               :key="index"
               ref="policyImg"
               width="100px"
               height="100px"
               style="margin-right:10px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="audit"
                     :loading="auditLoading">审核</el-button>
          <el-button type="primary"
                     @click="modifyPolicy()">修改保单</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 施工照片实例 -->
    <el-dialog title="施工照片"
               center
               :visible.sync="constructionVisible"
               width="25%">
      <div class="constructionImg">
        <div v-for='(item,index) in constructionImgList'
             :key="index">
          <img :src="item.image"
               ref="constructionImg" />
          <p>{{item.title}}</p>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import {
  getPlateRecord,
  searchByPlate,
  sendCode,
  submitServeForm,
  Payoil,
  BangQrPayStatus,
  updatePloicy,
  policyType,
  GetCompany,
  putPolicy,
  checkPolicy
} from "@/server/serverData";
export default {
  data () {
    return {
      // 京A12345
      token: window.localStorage.getItem('token'),
      form: {
        plate: "",
        code: "",
        the_mileage: ""
      },
      plateRecord: [],
      last_mileage: "",
      carInfo: {},
      time: "发送验证码",
      disabled: false,
      dialogVisible: false,
      PayVisible: false, //扫码支付显示状态
      PayLoading: false, //支付加载状态
      PayCode: {}, //支付二维码
      PayStatus: false, //支付状态
      Tips: '',
      policyVisible: false, //上传保单弹框显示状态
      magnifyImgVisible: false, //图片放大弹框显示状态
      magnifyImageUrl: '', //需要发大的图片
      uploadLoading: false, //上传loading
      submitLoading: false, //提交loading
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
      insuredType: [], //投保类型列表
      companyList: [], //保险公司列表
      instanceVisible: false,
      auditPolicyVisible: false, //审核保单弹框显示状态
      PolicyList: {},//保单列表 
      auditLoading: false, //审核通过loading
      fileList: [], //默认显示上传的投保图片
      constructionVisible: false, //施工照片弹框显示状态
      constructionImgList: [  //施工照片实例
        // {
        //   image: 'https://xmp.ctbls.com/uploads/Gift/20200109/first.png',
        //   title: '车前照'
        // },
        {
          image: 'https://xmp.ctbls.com/uploads/Gift/20200109/sencnd.png',
          title: '施工照'
        },

      ],
      oil_photo: [], //所上传的施工照片
    };
  },
  computed: {
    nextMileage () {
      return this.form.the_mileage < 0
        ? Number(this.carInfo.km)

        // + Number(this.carInfo.last_mileage)
        : Number(this.carInfo.km) +
        Number(this.form.the_mileage)

      // +
      // Number(this.carInfo.last_mileage);
    },
    ThisTimeMileage () {
      return this.form.the_mileage;
    }
  },
  watch: {
    ThisTimeMileage (newValue) {
      if (newValue < 0) {
        this.form.the_mileage = 1;
      }
    }
  },
  methods: {

    selectPlate (item) {
      this.form.plate = item;
      this.plateRecord = [];
      this.search();
    },
    async getRecord () {
      let res = await getPlateRecord(this.form.plate);
      console.log(res.data);
      this.plateRecord = res.data;
    },
    mileageRule () { },
    // 根据车牌号查询车主信息
    async search () {
      let shop_type = window.localStorage.getItem('shop_type')
      if (shop_type == 2) {
        this.$confirm('暂无权限', '提示', {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          showClose: false,
          closeOnClickModal: true,
          closeOnPressEscape: true,
          center: true,
        })
        return;
      }
      let res = await searchByPlate(this.form.plate);
      if (res.data.code == 1) {
        this.carInfo = res.data.data;
      } else {
        this.carInfo = {}
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
      this.getCompany()
    },
    //发送验证码
    async sendCode () {

      let that = this;
      that.time = 10;
      that.disabled = true;
      var time = window.setInterval(function () {
        that.time--;
        if (that.time < 0) {
          that.time = "重新发送";
          that.disabled = false;
          window.clearInterval(time);
        }
      }, 1000);
      let res = await sendCode(this.carInfo.phone, this.carInfo.card_number);
      // let res = Math.floor(Math.random() * 10);
      if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    //支付油品金额
    async pay () {

      try {

        this.PayLoading = true
        //sid 维修厂id  uid 用户id  pay_money 支付金额  oid  油品ID
        const res = await Payoil({ sid: this.carInfo.sid, uid: this.carInfo.uid, pay_money: this.carInfo.pay_money, oid: this.carInfo.oid, cid: this.carInfo.cid })

        this.PayCode = res.data.data || {}

        if (res.data.code == 1) {
          this.PayVisible = true
        } else {
          this.$message({ message: res.data.msg, type: 'warning' })
          this.PayVisible = false
        }
        this.PayLoading = false
      } catch (error) {
        this.PayLoading = false
        throw (error)
      }
    },
    //确定扫码支付完成
    async confirmPay () {
      try {
        this.PayStatus = true
        const res = await BangQrPayStatus({ sid: this.carInfo.sid, cid: this.carInfo.cid, uid: this.carInfo.uid })
        this.PayStatus = false
        if (res.data.data.status == 1) {  //status支付状态 1 支付成功  0未支付
          this.$message({ message: res.data.data.detail, type: 'success' })
          this.PayVisible = false
          this.search()
        } else {
          this.$message.error(res.data.data.detail)
        }

      } catch (error) {
        this.PayStatus = false
        throw (error)
      }
    },
    // 提交服务表单
    submitForm () {
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let form = this.form,
          carInfo = this.carInfo;
        let fomrData =
          qs.stringify({ ...form }) + "&" + qs.stringify({ ...carInfo }) + "&" + qs.stringify({ oil_photo: this.oil_photo && this.oil_photo.length > 0 ? this.oil_photo : '' });
        this.submitLoading = true
        let res = await submitServeForm(qs.parse(fomrData));
        this.submitLoading = false
        if (res.data.code == 1) {
          this.dialogVisible = true;
          this.Tips = res.data.msg
          this.oil_photo = []
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      }).catch(() => { });

    },
    // 服务完成后
    complate () {
      this.form = {
        plate: "",
        code: "",
        the_mileage: ""
      };
      this.carInfo = {};
      this.dialogVisible = false;
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
    //打开上传保单的弹框
    openUpload () {
      this.policyVisible = true;
      try {    //获取投保类型列表
        this.policyTypeList().then(res => {
          let insuredType = res
          if (this.carInfo.put_policy == 2) {
            insuredType.forEach(item => {
              this.policyData.policy_type.forEach((el) => {
                if (item.type == el) {
                  item = Object.assign(item, { checked: true })
                }
              })
            })
          } else {
            insuredType.forEach(item => {
              item = Object.assign(item, { checked: false })
            })
          }
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
    async getCompany () {
      try {
        const res = await GetCompany({
          sid: this.carInfo.sid
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
    async upload () {  //上传保单

      try {
        this.uploadLoading = true
        const res = await updatePloicy(Object.assign(this.policyData, { sid: this.carInfo.sid, uid: this.carInfo.uid, cid: this.carInfo.cid }))
        this.uploadLoading = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.policyVisible = false
          this.auditPolicyVisible = false
          this.search()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.uploadLoading = false
        throw (error)
      }
    },
    async auditPolicy () {  //保单列表

      try {
        this.auditPolicyVisible = true
        const res = await putPolicy({
          uid: this.carInfo.uid,
          cid: this.carInfo.cid,
        })
        this.PolicyList = res.data.data || {}
        this.ImgAmplification('policyImg')
      } catch (error) {
        throw (error)
      }
    },
    audit () {  //审核保单
      this.$confirm('此操作将审核保单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          this.auditLoading = true
          const res = await checkPolicy({
            sid: this.carInfo.sid,
            uid: this.carInfo.uid,
            cid: this.carInfo.cid
          })
          this.auditLoading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.auditPolicyVisible = false
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.auditLoading = false
          throw (error)
        }
      })
    },
    modifyPolicy () {  //修改保单
      this.$nextTick(() => {
        this.policyData = this.PolicyList
        this.fileList = this.PolicyList.pc_img.map(item => {
          return { url: item }
        })
        this.openUpload()
      })
    },

    viewConstructionImg () {  //查看施工照片实例
      this.constructionVisible = true
      this.ImgAmplification('constructionImg')
    },

    //上传投保图片 成功
    constructionSuccess (res) {
      this.oil_photo.push(res)
    },
    //删除投保图片 
    constructionRemove (res) {
      let index = this.oil_photo.findIndex(item => {
        return item == res.response
      })
      this.oil_photo.splice(index, 1)
    },


    ImgAmplification (img) {  //图片放大
      this.$nextTick(() => {
        let Img = this.$refs[img]
        console.log(Img)
        Img.forEach(item => {
          new Viewer(item)
        })
      })
    }
  },

};
</script>
<style lang="scss" scoped>
.instance {
  text-align: center;
  img {
    margin-right: 20px;
    border: 1px solid #ccc;
  }
}
.maintain {
  background-color: #ebedf0;
  min-height: calc(100vh - 105px);
  .viewMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
      height: 50px;
      font-size: 36px;
      font-weight: 400;
      line-height: 50px;
    }
    .whiteBlock {
      margin-top: 20px;
      border-radius: 5px;
      min-height: 363px;
      max-width: 1200px;
      width: 80%;
      min-width: 900px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .searchBox {
        margin-top: 80px;
        display: flex;
        align-items: center;
        position: relative;
        .plateImg {
          position: absolute;
          right: -80px;
          height: 50px;
          width: 50px;
        }
        input {
          width: 300px;
          height: 44px;
          background-color: #f1f3f6;
          border: 1px solid #b9c3cd;
          outline: none;
          padding: 0 10px;
        }
        .recordBox {
          position: absolute;
          left: 0;
          top: 44px;
          z-index: 100;
          overflow-y: scroll;
          max-height: 440px;
          p {
            box-sizing: border-box;
            line-height: 44px;
            border: 1px solid #b9c3cd;
            border-top: 0;
            width: 300px;
            background-color: #f1f3f6;
            padding: 0 10px;
            height: 44px;
          }
        }
        ::-webkit-input-placeholder {
          color: #cbcbcb;
          font-size: 14px;
        }
        button {
          color: #fff;
          outline: none;
          border: 0;
          width: 120px;
          height: 44px;
          background: #3498e9;
          font-size: 18px;
          font-weight: 400;
          line-height: 25px;
          cursor: pointer;
        }
        button:active {
          background-color: #66b1ff;
        }
      }
      span {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
      .carInfo {
        margin-top: 20px;
        .card {
          max-width: 960px;
          width: 80%;
          min-width: 800px;
          height: 300px;
          box-sizing: border-box;
          padding: 10px 0;
          margin: 0 auto;
          background: rgba(246, 243, 243, 1);
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .infoTabal {
            width: 90%;
            height: 206px;
            border: 1px solid #b9c3cd;
            tr {
              border: 1px solid #b9c3cd;
              height: 42px;
              td {
                width: 25%;
                vertical-align: middle;
                font-size: 14px;
                font-weight: 400;
                line-height: 40px;
              }
              td:first-child,
              td:nth-child(3) {
                text-align: right;
                color: #64696e;
              }
              td:nth-child(2),
              td:last-child {
                text-align: left;
                border-right: 1px solid #b9c3cd;
                color: #32373c;
              }
            }
          }
          span {
            margin-top: 0;
            font-size: 18px;
            font-weight: 600;
            line-height: 25px;
          }
        }
        .elForm {
          margin: 20px 290px 50px 170px;
          width: 500px;
          .submit {
            width: 370px;
            height: 44px;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .serveDialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 210px;
      width: 210px;
    }
    span {
      margin-top: 10px;
      font-size: 24px;
      font-weight: 400;
      line-height: 33px;
    }
    button {
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      line-height: 25px;
      margin: 50px;
      width: 300px;
      height: 50px;
      background: rgba(52, 152, 233, 1);
      border-radius: 5px;
    }
  }
}
.col-32373C {
  color: #32373c;
}
.col-64696e {
  columns: #64696e;
}
.Paycode {
  text-align: center;
  h1,
  h2 {
    margin: 10px 0;
    color: red;
  }
  img {
    width: 200px;
    height: 200px;
  }
}

// 上传保单
.insuredType {
  //保单类型
  margin: 0 10px 10px 0;
}
.el-Width {
  width: 55%;
}
.constructionInstance {
  position: absolute;
  top: -10px;
  right: 0;
  color: red;
  cursor: pointer;
}
.constructionImg:after {
  display: block;
  content: "";
  clear: both;
}
.constructionImg {
  width: 100%;
  margin: 0 auto;

  & > div {
    width: calc(100% / 1 - 20px);
    text-align: center;
    float: left;
    margin: 0 10px;

    img {
      width: 100%;
      height: 150px;
      margin-bottom: 10px;
    }
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
