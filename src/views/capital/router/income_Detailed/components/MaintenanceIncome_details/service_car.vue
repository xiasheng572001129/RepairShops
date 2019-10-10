<template>
    <div class='activity_reward'>
        <div class='table'>
            <el-table :data="tableData" style="width: 100%" :max-height="screenHeight">
                <el-table-column  label="邦保养卡号"   prop="card_number" align="center"></el-table-column>
                <el-table-column  label="车主姓名" prop="name" align="center"></el-table-column>
                <el-table-column  label="车主手机号" prop="phone" align="center"></el-table-column>
                <el-table-column  label="车主车牌号" prop="plate" align="center"></el-table-column>
                <el-table-column  label="邦保养卡价格" prop="card_price" align="center"></el-table-column>
                <el-table-column  label="奖励金额" prop="money" align="center"></el-table-column>
                <el-table-column  label="创建时间" prop="create_time" align="center"></el-table-column>
            </el-table>
        </div>


        <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    </div>
</template>
<script>
    import { getServeIncome } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        data(){
            return{
                currentPage:1, //当前页
                pageCount:1, //总页数
                tableData:[],
                screenHeight:window.innerHeight-370,
                detailsDialogVisible:false
            }
        },
        components:{
            paging
        },
        methods:{
            /** 活动奖励列表 **/
           async init (){
              try{
                  let res = await getServeIncome(
                          {
                              page:this.currentPage
                          }
                  )
                  if(res.data.code==1){
                    console.log(res)
                      this.tableData=res.data.data.list
                      this.pageCount=res.data.data.rows;
                  }else {
                      this.tableData=[]
                      this.pageCount=1
                  }
              }catch (err){
                  console.log(err)
              }
           },

          currentChange(e){
              this.currentPage=e;
              this.init()
          }
        },
        mounted(){
            this.init()
            var that=this
            window.onresize = () => {
                return (() => {
                    that.screenHeight = window.innerHeight - 370
            })()
            }
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .form{
        /deep/ .el-form-item__content{
            .el-input-group__append, .el-input-group__prepend{
                border: none;
                background-color: #3498E9;
                color: white;
                padding: 0 30px;
            }
        }
        .search{
            margin-right: 40px;
        }
    }
    .table{
        /deep/ .el-table th, .el-table tr{
            background-color: #D7E1E6;
            .ellipsis{
                width: 120px;
                height: 100%;
                line-height: 100%;
                font-size: 12px;
                display: inline-block;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;

            }
        }
    }
    .total{
        padding: 30px 80px;
    }
    .paging{
        text-align: center;
        margin-top: 30px;
    }
    .details{
        span{
            min-height: 200px;
            display: inline-block;
        }
    }
</style>
