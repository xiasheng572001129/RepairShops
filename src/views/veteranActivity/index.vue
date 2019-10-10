<template lang="html">
  <div class="html">
    <div class="activity">
        <div class="outer_layer">
            <div class="go">
              <a href="#/home">返回首页</a>
            </div>
            <div class="img">
                <img src="./images/txt.png" alt="">
                <a href="javascript:void(0);" @click="upgrade">点击升级</a>
            </div>
        </div>
    </div>
    <div class="content">
      “老兵”，一个光荣的群体！ <br>
	  每位“老兵”，都怀揣着一颗拳拳赤子爱国之心，<br>
	  曾经的军旅生涯，都是难以忘怀，都有一个个刻骨铭心的故事。 <br>

	仲达集团现推出《致敬老兵》主题活动，就是为了对为祖国繁荣安定奉献青春的老兵群体的尊敬，<br>
	老兵仅限首次参与单次体验半价，再次购买选择套餐，仲达公司将此主题活动款，单次的全部，套餐的10%捐助老兵公益，用于有实际困难的老兵家庭！<br>

	《邦保养》店面可自主选择是否参与为老兵服务店。<br>
	此次致敬老兵活动，店面服务无工时费，仅有机滤补助，老兵再次参与只能选择套餐，店面各种补助不变；<br>
	未选择参与活动的店面，不具备服务老兵车主权限；
    </div>
  </div>

</template>

<script>
import {activity} from "@/server/serverData";
export default {
  data(){
    return {}
  },
  created(){
    // activity().then(res=>{
    //   console.log(res)
    // })
  },
  methods:{
    upgrade(){
      this.$confirm('是否参与？').then(_=>{
        return activity()
      }).then(res=>{
        res.data.code == 1?
        this.$message.success(res.data.msg):
        this.$message.error(res.data.msg);
      }).catch(_=>0)

    }
  }
}
</script>

<style lang="css" scoped>
.activity{
  padding-top: 48px;
  width: 100%;
  background: url(./images/bg.png) no-repeat;
  background-size: 100%;
}
.outer_layer{
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.outer_layer .go{
  width: 100%;
  height:44px;
  overflow: hidden
}
.outer_layer .go a{
  float: right;
  width:200px;
  height:44px;
  line-height: 44px;
  background:rgba(48,72,85,1);
  border-radius:37px;
  font-size:16px;
  color:rgba(255,255,255,1);
  letter-spacing:2px;
}
.outer_layer .img{
  overflow: hidden;
  text-align: center;
}
.outer_layer .img img{
  display: block;
  margin: 0 auto 10px;
}
.outer_layer .img a{
  display: block;
  width:300px;
  height:44px;
  margin: -32px auto 40px;
  line-height: 44px;
  background:linear-gradient(90deg,rgba(255,120,81,1) 0%,rgba(255,40,40,1) 100%);
  border-radius:22px;
  font-size:16px;
  color:#fff;
}
.html .content{
  padding-top: 15px;
  text-align: center;
  font-size:14px;
  font-weight:400;
  line-height: 30px;
  color:rgba(100,105,110,1);
}





</style>
