<template lang="html">
  <div class="">
    <Small_header></Small_header>
    <currentPage class='currentPage' :id='200'></currentPage>
    <div class='table'>
        <el-table :data="tableData" style="width: 100%" >
            <el-table-column prop="odd_num" label="订单编号"  align="center"></el-table-column>
            <el-table-column prop="brand" label="品牌名称"  align="center"></el-table-column>
            <el-table-column prop="num" label="数量" align="center"></el-table-column>
            <el-table-column prop="name" label="赠品名称"   align="center"></el-table-column>
            <el-table-column prop="standard" label="赠品型号"   align="center"></el-table-column>
            <el-table-column prop="deliver_time" label="发货时间"  align="center"></el-table-column>
            <el-table-column label="操作"  align="center">
                <template slot-scope='scope'>
                    <el-button type="primary" size='small' @click='confirm(scope.row)'>确认收货</el-button>
                </template>
            </el-table-column>
        </el-table>
        <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    </div>
  </div>

</template>

<script>
import {
  confirmGifts,
  receiptGifts
} from "@/server/serverData";
import paging from '@/views/common/paging';
import Small_header from '@/views/common/Small_header';
import currentPage from '@/views/common/currentPage'
export default {
  data() {
    return {
      pageCount: 1,
      tableData: []
    }
  },
  components:{paging,Small_header,currentPage},
  methods:{
    receiptGifts(page = 1){
      this.tableData = [];
      receiptGifts({
        page: page
      }).then(res=>{
        if(res.data.code){
          this.tableData = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }
      })
    },

    confirm(e){
      this.$confirm('是否确认收货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.confirmGifts(e)
        }).catch(()=>{});
    },
    confirmGifts(e){
      confirmGifts({
        id: e.id,
        sm_id: e.sm_id,
        odd_num: e.odd_num,
        price: e.price
      }).then(res=>{
        if(res.data.code){
          this.$message.success(res.data.msg)
          this.receiptGifts()
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    currentChange(p){
      this.receiptGifts(p)
    }

  },
  created(){
    this.receiptGifts()
  }
}
</script>

<style lang="css" scoped>
</style>
