<template>
  <div class="home">
    <header class="header">
      <heaDer></heaDer>
    </header>
    <section class="section">
      <mainBar></mainBar>
    </section>
    <div class="Tips">
      <p>
        {{activity.con}}
        <span class="col-00912D">{{activity.first}}</span>
        {{activity.con1}}
        <span class="col-FF2828">{{activity.second}}</span>
        {{activity.con2}}
      </p>
      <p class="col-3498E9">{{activity.detail}}</p>
    </div>
    <footer>
      <div class="footer">
        <ul>
          <li>
            <span>
              <img src="./images/Telephone.png">
            </span>
          </li>
          <li v-show="phoneList.agent==1">{{phoneList.agent_phone}}</li>
          <li v-show="phoneList.sm==1">服务经理 ：{{phoneList.sm_phone}}</li>
        </ul>
      </div>
    </footer>
    <component is="QR_CODE"
               v-show="shop_type"></component>
    <!--/** 系统消息 **/-->
    <el-dialog :title="newsDate.title"
               :visible.sync="centerDialogVisible"
               width="50%"
               center
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="content">
        <div v-html="newsDate.content"></div>
        <p class="time">{{newsDate.create_time}}</p>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="Already_read">已读</el-button>
      </span>
    </el-dialog>
    <!--/** 呵呵 **/-->
    <el-dialog :title="text1.title"
               :visible.sync="text_show"
               width="50%"
               center
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="conten1"
           v-html="text1.content"></div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="text1_read">已读</el-button>
      </span>
    </el-dialog>

    <!-- <transition name="slide-fade">
        <div class="popup" v-show="actShow">
            <span class="close" @click="actShow = false"></span>
            <router-link tag='a' to='/veteranActivity' class=''></router-link>
            <img src="./images/activity.png" alt="" />
        </div>
    </transition> -->

    <el-dialog :title="upgrade.bottom"
               :show-close="false"
               :visible.sync="dialogVisible"
               width="30%">
      <div style="text-align:center">
        <p style="margin:20px 0">
          <el-radio v-model="radio"
                    label="1">智能连锁店</el-radio>
          <el-radio v-model="radio"
                    label="2">售后服务站</el-radio>
        </p>
        <div>
          <img :src="upgrade.src" />
        </div>
        <span>{{upgrade.detail}}</span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="small"
                   @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {
  getPhoneIndex,
  getList,
  unreadMsg,
  unreaLock,
  apply,
  homegettext,
  UpgradeQrpay,
  payStatus
} from "@/server/serverData";
import { mapState } from "vuex";
import heaDer from "@/views/common/header";
import mainBar from "./components/main";

export default {
  name: "home",
  data () {
    return {
      activityData: {},
      phoneList: {},
      centerDialogVisible: false,
      actShow: true,
      newsDate: [],
      state: 0,
      materiel_ALERT: window.sessionStorage.getItem("materielState"),
      loading: true,
      dialogVisible: false,
      text1: {
        content: "",
        title: ""
      },
      radio: '1',
      upgrade: {}
    };
  },
  components: {
    heaDer,
    mainBar
  },
  computed: {
    activity () {
      return JSON.parse(window.sessionStorage.getItem("action")) || {};
    },
    shop_type () {
      return window.sessionStorage.getItem("shop_type") == 1 ? true : false;
    },
    text_show () {
      return this.text1.title == "" && this.text1.content == "" ? false : true;
    }
  },
  watch: {
    radio () {
      this.Upgrade()
    }
  },
  methods: {
    text1_read () {
      this.text1 = {
        content: "",
        title: ""
      };
    },
    async init () {
      try {
        /** 获取footer手机号 **/
        let res = await getPhoneIndex();
        if (res.data.code == 1) {
          this.phoneList = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
      try {
        /** 获取消息 **/
        let res = await getList();
        if (res.data.code == 1) {
        }
      } catch (err) {
        console.log(err);
      }
      try {
        let res = await unreadMsg();
        if (res.data.code == 1) {
          this.centerDialogVisible = true;
          this.newsDate = res.data.data[0];
        } else {
          this.centerDialogVisible = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    /** 已读 **/
    async Already_read () {
      try {
        let res = await unreaLock({
          id: this.newsDate.id,
          have: this.newsDate.have
        });
        if (res.data.code == 1) {
          (this.centerDialogVisible = false), this.init();
        }
      } catch (err) {
        console.log(err);
      }
    },
    /** 查看用户是否需要补充物料 **/
    async materiel () {
      try {
        let res = await apply();
        console.log("没有物料了");
        if (res.data.code == 1) {
          let that = this;
          console.log(this.materiel_ALERT);
          if (!this.materiel_ALERT) {
            this.$confirm(res.data.msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnClickModal: false,
              closeOnPressEscape: false,
              type: "warning"
            })
              .then(() => {
                /** 没有物料跳转邦保养管理添加物料 **/
                that.$router.push("/maintainMode/materielM");
                window.sessionStorage.setItem("materielState", true);
              })
              .catch(() => {
                console.log(123);
                window.sessionStorage.setItem("materielState", true);
              });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async gettext () {
      console.log("gettext");
      this.text1 = await homegettext();
    },
    async homepayStatus () {
      return payStatus({
        sid: window.sessionStorage.getItem("parmas_sid")
      })
    },
    Upgrade () {
      return UpgradeQrpay({
        sid: window.sessionStorage.getItem("parmas_sid"),
        shop_type: 1,
        type: this.radio
      }).then(res => {
        if (res.code) {
          this.upgrade = res.data
        }
      })
    },
    onConfirm () {
      this.dialogVisible = false
      this.homepayStatus().then(res => {
        if (res.code == 1) {
          if (res.data.status == 1) {
            // this.$message.success(res.data.detail)
            this.$alert(res.data.detail).then(_ => {
              window.sessionStorage.clear();
              this.$notify.closeAll()
              this.$router.push("/login");
            }).catch(e => console.log(e))
          } else {
            this.$message.error(res.data.detail)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }


  },

  mounted () {
    this.init();
    this.$nextTick(() => {
      console.log(this.phoneList);
    });
    this.materiel();
    if (this.$route.params.shop_type == 2) {
      // 当店铺类别是2 ubi店铺时
      // console.log("homegettexthomegettext");
      window.sessionStorage.setItem("parmas_sid", this.$route.params.sid);
      this.$notify({
        title: '提示',
        message: '点我一键升级为邦保养智能连锁店面',
        duration: 0,
        offset: 100,
        onClick: function () {
          this.dialogVisible = true;
          this.Upgrade()
        }.bind(this)
      });
      this.gettext();
    }
    if (this.$route.params.if_action == 1)
      this.actShow = false;
    else
      this.actShow = true;
  },
  // beforeRouteEnter(to, from, next){
  //   console.log(to)
  //   console.log(from)
  // },
  // updated(){
  //   if (!this.shop_type) {
  //     // 当店铺类别是2 ubi店铺时
  //     // console.log("homegettexthomegettext");
  //     this.$notify({
  //         title: '提示',
  //         message: '点我一键升级为邦保养智能连锁店面',
  //         duration: 0,
  //         offset: 100,
  //         center: true,
  //         onClick:function () {
  //
  //           UpgradeQrpay({
  //             sid:window.sessionStorage.getItem("parmas_sid"),
  //             shop_type:1
  //           }).then(res=>{
  //             this.$alert('<div style="text-align:center"><div><img src="'+res.data.src+'" /></div><span>'+res.data.detail+'</span></div>', res.data.bottom,{
  //                dangerouslyUseHTMLString: true
  //             })
  //           })
  //
  //         }
  //       });
  //   }
  // }
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.popup {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  .close {
    position: absolute;
    right: 2%;
    bottom: 38%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    z-index: 99;
  }
  a {
    width: 164px;
    height: 50px;
    position: absolute;
    bottom: 17%;
    right: 23%;
    cursor: pointer;
    z-index: 99;
  }
  img {
    display: block;
    width: 100%;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(300px);
  opacity: 0;
}

.home {
  /deep/ .el-dialog__wrapper {
    z-index: 99999 !important;
  }
  /deep/ .el-loading-mask {
    z-index: 9999999 !important;
  }
  width: 100%;
  text-align: center;
  position: relative;
  height: 100%;
  overflow: hidden;
  .header {
    height: 55px;
  }
  .section {
    height: calc(100% - 110px);
    overflow: auto;
  }
  p {
    margin-bottom: 15px;
    font-size: 18px;
  }
  .col-00912D {
    color: #00912d;
  }
  .col-FF2828 {
    color: #ff2828;
  }
  .col-3498E9 {
    color: #3498e9;
  }
  .Tips {
    width: 100%;
    bottom: 87px;
    position: absolute;
    text-align: center;
  }
  footer {
    width: 100%;
    bottom: 0;
    position: fixed;
    text-align: center;
    .footer {
      background-color: #32373c;
      line-height: 55px;
      color: white;

      & > ul:after {
        display: block;
        content: "";
        clear: both;
      }
      & > ul {
        display: flex;
        margin: 0 auto;
        justify-content: center;
        text-align: center;
        align-items: center;
        li {
          padding: 0 20px;
          text-align: center;

          img {
            vertical-align: middle;
          }
        }
        & > li:first-child {
          span {
            height: 40px;
            border-right: 1px solid white;
            padding-right: 15px;
          }
        }
      }
    }
  }
  .content {
    min-height: 400px;
    .time {
      text-align: right;
      margin-top: 30px;
    }
  }
  /deep/ .conten1 {
    min-height: 400px;
    span {
      line-height: 25px;
    }
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }
}
</style>
