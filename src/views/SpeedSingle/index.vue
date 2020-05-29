<template>
  <div class="single">
    <header class='header'>

      <Head :isShow='true'></Head>
    </header>
    <content>
      <div class="main">
        <a href="https://yi.zhufengic.com/ipartner/index"
           class="Everest">珠峰保险</a>
        <a href="https://rbt.guorenpcic.com/ecar/#/login"
           class="Theterm">国任保险</a>
        <a href="http://www.cpic.com.cn/"
           class="Ocean">太平洋保险</a>
        <a href="https://icar.epicc.com.cn:8443/icar/saaUserPower/login.do"
           class="danger">人保保险</a>
        <a href="http://ygibao.com"
           class="Sunshine">阳光保险</a>
        <a href="http://www.bpic.com.cn/"
           class="Bohai">渤海保险</a>
        <a href="http://t.tk.cn/tplatform_clientManage/cxLogin.do"
           class="taikang">泰康代理</a>
      </div>
    </content>
  </div>
</template>
<script>
import Head from "@/views/common/header";
export default {
  components: { Head }

}
</script>
<style scoped  lang="scss">
.single {
  width: 100%;
  height: 100%;
  //   background-color: bisque;
}
.main {
  width: 900px;
  margin: 100px auto auto auto;
  position: relative;
  & > a {
    width: calc(100% / 4 + 55px);
    height: 160px;
    margin: 10px 10px;
    border-radius: 10px;
    background-color: #fff;
    display: inline-block;
    line-height: 260px;
    text-align: center;
    font-size: 18px;
    box-shadow: 1px 1px 10px 1px #888888;
    transition: 0.5s;
  }
  & > a:hover {
    transform: translateY(-10px);
  }
  .Everest {
    background-image: url("./images/logo.png");
    background-size: 70% 40%;
    background-repeat: no-repeat;
    background-position-y: 40px;
    background-position-x: 20px;
  }
  .Theterm {
    background-image: url("./images/Theterm.png");
    background-size: 80% 40%;
    background-repeat: no-repeat;
    background-position-y: 40px;
    background-position-x: 20px;
  }
  .danger {
    background-image: url("./images/danger.png");
    background-size: 80% 30%;
    background-repeat: no-repeat;
    background-position-y: 40px;
    background-position-x: 30px;
  }

  .Ocean {
    background-image: url("./images/Ocean.jpg");
    background-size: 80% 70%;
    background-repeat: no-repeat;
    background-position-y: 20px;
    background-position-x: 20px;
  }
  .Sunshine {
    background-image: url("./images/Sunshine.jpg");
    background-size: 100% 50%;
    background-repeat: no-repeat;
    background-position-y: 25px;
    background-position-x: 5px;
  }
  .Bohai {
    background-image: url("./images/Bohai.jpg");
    background-size: 100% 50%;
    background-repeat: no-repeat;
    background-position-y: 30px;
    background-position-x: -10px;
  }
  .taikang {
    background-image: url("./images/taikang.jpg");
    background-size: 90% 55%;
    background-repeat: no-repeat;
    background-position-y: 30px;
    background-position-x: 10px;
  }
}
</style>