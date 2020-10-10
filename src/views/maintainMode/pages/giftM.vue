<template>
  <div class="materiel">
    <div class="viewMain">
      <div class="tabChange">
        <div :class="[currentTab==1?'second col-32373C tabActive':'','first col-32373C']"
             @click="tabChange(1)">未发货</div>
        <div :class="[currentTab==2?'second col-32373C tabActive':'','first col-32373C']"
             @click="tabChange(2)">已完成</div>
      </div>
      <div class="secondBody"
           v-show="currentTab == 1">
        <el-table :data="tableData"
                  :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
          <el-table-column prop="odd_num"
                           label="订单编号"
                           align="center"></el-table-column>
          <el-table-column prop="brand"
                           label="品牌名称"
                           align="center"></el-table-column>
          <el-table-column prop="num"
                           label="数量"
                           align="center"></el-table-column>
          <el-table-column prop="name"
                           label="赠品名称"
                           align="center"></el-table-column>
          <el-table-column prop="standard"
                           label="赠品型号"
                           align="center"></el-table-column>
          <el-table-column prop="create_time"
                           label="订单创建时间"
                           align="center"></el-table-column>
        </el-table>
        <el-pagination class="page"
                       background
                       layout="prev, pager, next"
                       @current-change="supplyRecord"
                       :current-page.sync="currentPage"
                       :page-count="totalPage">
        </el-pagination>
      </div>
      <div class="secondBody"
           v-show="currentTab == 2">
        <el-table :data="tableData"
                  :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
          <el-table-column prop="odd_num"
                           label="订单编号"
                           align="center"></el-table-column>
          <el-table-column prop="brand"
                           label="品牌名称"
                           align="center"></el-table-column>
          <el-table-column prop="num"
                           label="数量"
                           align="center"></el-table-column>
          <el-table-column prop="name"
                           label="赠品名称"
                           align="center"></el-table-column>
          <el-table-column prop="standard"
                           label="赠品型号"
                           align="center"></el-table-column>
          <el-table-column prop="deliver_time"
                           label="发货时间"
                           align="center"></el-table-column>
        </el-table>
        <el-pagination class="page"
                       background
                       layout="prev, pager, next"
                       @current-change="supplyRecord"
                       :current-page.sync="currentPage"
                       :page-count="totalPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  deliverGifts,
  createGifts
} from "@/server/serverData";
export default {
  data () {
    return {
      currentTab: 1,
      currentPage: 1,
      totalPage: 50,
      tableData: []
    }
  },
  methods: {
    supplyRecord (p) {
      if (this.currentTab == 1) {
        this.createGifts(p)
      } else {
        this.deliverGifts(p)
      }
    },
    deliverGifts (page = 1) {
      deliverGifts({
        page: page
      }).then(res => {
        if (res.data.code) {
          this.tableData = res.data.data.list;
          this.totalPage = res.data.data.rows;
        }
      })
    },
    createGifts (page = 1) {
      createGifts({ page }).then(res => {
        if (res.data.code) {
          this.tableData = res.data.data.list;
          this.totalPage = res.data.data.rows;
        }
      })
    },
    tabChange (a) {
      this.currentTab = a;
      this.tableData = [];
      this.currentPage = 1;
      if (this.currentTab == 1) {
        this.createGifts()
      } else {
        this.deliverGifts()
      }
    }

  },
  created () {
    this.tabChange(1)
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
.materiel {
  min-height: calc(100vh - 105px);
  background-color: #fff;
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
    position: relative;
    .tabChange {
      height: 50px;
      width: 100%;
      position: absolute;
      top: 10px;
      left: 30px;
      display: flex;
      div {
        height: 41px;
        width: 200px;
        border: 1px solid #b9c3cd;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        z-index: 10;
      }
      .tabActive {
        background-color: #3498e9;
        border: 0;
        color: #fff;
      }
    }
    .firstBody {
      position: absolute;
      top: 50px;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 100px 250px 0;
      width: 100%;
      border-top: 2px solid #b9c3cd;
      .oilItem {
        width: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          height: 240px;
          width: 240px;
        }
        .oilDet {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .oilName {
            display: inline-block;
            font-size: 18px;
            font-weight: 400;
            line-height: 25px;
            margin: 20px auto 26px;
          }
          .detTable {
            font-size: 14px;
            font-weight: 400;
            color: #32373c;
            line-height: 20px;
            width: 100%;
            background: #fff;
            border: 1px solid #b9c3cd;
            tr {
              width: 240px;
              height: 32px;
              td {
                width: 50%;
                line-height: 32px;
                text-align: center;
                border: 1px solid #b9c3cd;
              }
            }
          }
        }
        .addOil {
          margin-top: 30px;
        }
      }
    }
    .secondBody {
      position: absolute;
      top: 50px;
      width: 100%;
      border-top: 2px solid #b9c3cd;
      .filterCondition {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
      }
      .page {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.supplyDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 32px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .supplySubmit {
    width: 300px;
    height: 44px;
    margin-top: 16px;
    background: rgba(0, 153, 255, 1);
  }
}
.supplyDialogBox,
.supplyDetDialogBox {
  .applyTable {
    width: 100%;
    tr {
      text-align: center;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #d7e1e6;
    }
    tr:first-child {
      td {
        height: 50px;
      }
      background-color: #d7e1e6;
    }
  }
}

.supplyDetDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  .supplySubmit {
    width: 300px;
    height: 44px;
    margin-top: 40px;
    background: rgba(0, 153, 255, 1);
  }
}
.withdrawDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  .withdrawText {
    width: 100%;
    min-height: 200px;
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 20px;
    background-color: #f1f3f6;
  }
  .withdrawText::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #cbcbcb;
    line-height: 20px;
  }
  .supplySubmit {
    width: 300px;
    height: 44px;
    margin-top: 30px;
    background: rgba(0, 153, 255, 1);
  }
}
.previewDialogBox {
  width: 100%;
  min-height: 300px;
  border-top: 2px solid #b9c3cd;
  margin-top: -15px;
  padding: 20px 25px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 34px;
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
