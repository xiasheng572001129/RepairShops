<template>
  <div class='Userlogin'>
    <div class="project_paper">
      <!-- <el-cascader :options="options"
                   v-model="value">
        <template slot-scope="{ node, data }">
          <span>{{ data.label }}</span>

        </template>
      </el-cascader> -->
      <el-popover placement="right"
                  width="400"
                  trigger="click">
        <el-button slot="reference"
                   class="manual">项目手册</el-button>
        <ul class="manual_list">
          <li>
            <a href="https://ceshi.ctbls.com/uploads/Gift/20180904/chanshu.pdf">项目介绍</a>
          </li>

          <li @click="participate">维修厂参与流程</li>
          <li>
            <a href="https://ceshi.ctbls.com/uploads/Gift/20180904/shoujiban.pdf"> 维修厂注册流程(手机版)</a>
          </li>
          <li>
            <a href="https://ceshi.ctbls.com/uploads/Gift/20180904/chuangxinjike.pdf">
              创新集客
            </a>
          </li>

          <li>常见问题</li>

        </ul>
      </el-popover>
    </div>
    <div class='bg_left'></div>
    <login class='login'></login>
    <div class='bg_right'></div>
    <div style='display: none'
         ref='laybox'
         class='doc-laybox'>
      <div v-html='laycontent'></div>
    </div>
  </div>
</template>
<script>
import { getBankCode, file } from "@/server/serverData"
import login from '@/views/userLogin/login/components/login/login'
export default {
  name: 'userLogin',
  components: {
    login
  },
  data () {
    return {
      laycontent: ''

    }
  },
  methods: {
    async participate () {
      try {
        const res = await file({ d_id: 226 })

        this.laycontent = window.etos(res.data.content);
        layer.open({
          type: '1',
          title: '维修厂参与流程',
          content: jQuery('.doc-laybox')
        })
      } catch (err) {
        throw (err)
      }
    }
  }
}

</script>
<style lang='scss' scoped rel="stylesheet/scss">
.manual_list li {
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #dcdfe6;
  text-align: center;
}
.Userlogin {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(52, 152, 233, 1);
  position: relative;
  .project_paper {
    text-align: right;
    margin: 20px;
    .manual {
      background: rgba(255, 255, 255, 0.5);
      border: none;
    }
  }
  .bg_left {
    width: 50%;
    height: 321px;
    background-image: url("public/login/bg_left.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    margin-top: -160.5px;
  }
  .bg_right {
    width: 39%;
    height: 321px;
    right: 0;
    background-image: url("public/login/bg_right.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    margin-top: -160.5px;
    z-index: 0;
  }
}
</style>
<style >
.layui-layer {
  width: 100% !important;
  height: 100%;
}
.layui-layer-content {
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
}
.layui-layer-title {
  text-align: center;
}
</style>