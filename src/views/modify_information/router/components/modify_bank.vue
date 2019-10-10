<template>
    <div class='modify_input'>
        <p class='col-32373C ft-36'>修改提现账户</p>
         <div class='input_tel'>
             <table class='col-64696E'>
                 <tr>
                     <td>开户名:</td>
                     <td> <el-input v-model='shopInfoList.account_name'></el-input></td>
                 </tr>
                 <tr>
                     <td>账户号:</td>
                     <td> <el-input v-model='shopInfoList.account'></el-input></td>
                 </tr>
                 <tr>
                     <td>开户行:</td>
                     <td>
                         <el-select placeholder="请选择"  v-model='shopInfoList.bank_name' @change='getBankID'>
                             <el-option v-for='item of BankList' :key='item.id' :value='item.name' :label='item.name'></el-option>
                         </el-select>
                     </td>
                 </tr>
                 <tr>
                     <td>分行:</td>
                     <td> <el-input v-model='shopInfoList.branch'></el-input></td>
                 </tr>
                 <tr>
                     <td>验证码:</td>
                     <td>
                       <el-input placeholder="请输入验证码" v-model='numberCode' class="input-with-select">
                           <el-button slot="append" @click='getCode' :disabled='isdisabled'>{{btnVal}}</el-button>
                       </el-input>
                     </td>
                 </tr>
                 <tr>
                     <td></td>
                     <td>
                         <el-button type="primary" class='confirm_modify' @click='modify'>确认修改</el-button>
                     </td>
                 </tr>
             </table>
         </div>
    </div>
</template>
<script>
    import { setAccountCode,setAccount } from '@/server/serverData'
    export default{
        data(){
            return{
                shopInfoList:null,
                BankList:null,
                btnVal:'获取验证码',
                time:60,
                numberCode:'',
                isdisabled:false
            }
        },
        created(){
          this.shopInfoList = JSON.parse(decodeURIComponent(this.$route.query.shopInfoList))
          this.BankList = JSON.parse(decodeURIComponent(this.$route.query.BankList))
        },
        methods:{
            modify(){
              if(!this.numberCode){
                this.$message.error('请输入验证码')
                return false;
              }
              setAccount({
                branch:this.shopInfoList.branch,
                bank:this.shopInfoList.bank,
                account_name:this.shopInfoList.account_name,
                account:this.shopInfoList.account,
                code:this.numberCode
              }).then(res=>{
				  if(res.data.code){
					this.$message.success(res.data.msg)

					this.$router.push('/account_information')
				  }else{
					this.$message.error(res.data.msg)
				  }
			  })
			  
            },

            getBankID(e){
              let finIndex =  this.BankList.findIndex(v=>{
                  return v.name==e
              })
             this.shopInfoList.bank=this.BankList[finIndex].code
            },
            getCode(){
              this.isdisabled = true;
              var interval = window.setInterval(()=>{
                     this.btnVal = '(' + this.time + ')秒后';
                      --this.time;
                  if (this.time < 0) {
                      this.btnVal = '重新发送';
                      this.isdisabled = false;
                      this.time = 60;
                      window.clearInterval(interval);
                  }
              },1000);
              this.VerificationCode()
            },
            /** 获取验证码 **/
            async VerificationCode(){
                 let  res= await setAccountCode()
                 if(res.data.code==1){
                     this.$message({message:res.data.msg,type:'success'})
                 }else {
                     this.$message.error(res.data.msg)
                 }
            },

        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .modify_input{
         text-align: center;
        .input_tel{
            width: 62%;
            background-color: white;
            margin: 30px auto 0 auto;
            padding-top: 87px;
            table{
               width: 40%;
                margin: 0 auto;
                text-align: right;
                td{
                    padding-bottom: 10px;
                    .confirm_modify{
                        width: 100%;
                        margin-top: 33px;
                        margin-bottom: 180px;
                    }
                }
                td:first-child{
                    padding-right: 10px;
                    width: 80px;
                }
            }
        }
    }
    .el-select{
      width:100%;
    }
</style>
