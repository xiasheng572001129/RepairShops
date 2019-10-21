<template>
  <div class="single">
    <header class='header'>

      <Head :isShow='true'></Head>
    </header>
    <content>
      <div class="main">
        <a href="javascript:;"
           class="dongfeng"
           @click="unopen">东风</a>
        <a href="javascript:;"
           class="Changan" @click="unopen">长安</a>

      </div>
    </content>
  </div>
</template>
<script>
import Head from "@/views/common/header";
export default {
  components: { Head },
  methods: {
    unopen () {
      this.$message({ message: '该功能暂未开放', type: 'warning' })
    }
  }
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
  .dongfeng {
    background-image: url("./image/dongfeng.jpg");
    background-size: 80% 80%;
    background-position-x: 50%;
    background-repeat: no-repeat;
  }
  .Changan {
    background-image: url("./image/Changan.jpg");
    background-size: 50% 70%;
    background-position-x: 50%;
    background-position-y: 10%;
    background-repeat: no-repeat;
  }
}
</style>