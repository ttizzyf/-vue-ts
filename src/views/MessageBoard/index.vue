<script lang="ts" setup>
import { ref } from "vue";
import Wheader from "@/components/Wheader.vue";
import privateLetter from "./components/privateLetter.vue";
import messageBoard from "./components/messageBoard.vue";

const srcList = ref(["../../../public/wx.jpg"]);
</script>

<template>
  <div class="header-box pt20">
    <Wheader></Wheader>
  </div>
  <div class="message-list-box pt20">
    <div class="content-box">
      <div class="about-me-box">
        <el-card class="mb20" shadow="hover">
          <div class="pb20">
            <i class="iconfont mr10">&#xe63e;</i>
            <span class="fz16">关于博主</span>
          </div>
          <p>大家好,我是"MaiXF",是本站的作者</p>
          <p>✒️ 2年前端开发工作经验</p>
          <p>❤️ 热爱编程</p>
          <p>✈️ 现居成都</p>
          <p>有啥优化建议或者页面有bug可以反馈给我,联系方式见下方,感谢!</p>
          <p>😸邮箱:1374144742@qq.com</p>
          <p>😸留言:下方留言板</p>
          <div class="image center column mt16 mb16">
            <div class="mb16">欢迎访问我的博客!</div>
            <el-image
              fit="cover"
              style="width: 100px"
              :hide-on-click-modal="true"
              :preview-src-list="srcList"
              src="../../../public/wx.jpg"
              :initial-index="0"
              :zoom-rate="1.2"
              :max-scale="0.7"
              :min-scale="0.2"
            />
          </div>
        </el-card>
      </div>
      <privateLetter></privateLetter>
      <messageBoard></messageBoard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-box {
  // padding: 0 20px;
  width: 100%;
}
.message-list-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-box {
    width: 800px;
    @media screen and (max-width: 800px) {
      max-width: 100%;
    }
    .about-me-box {
      color: #fff;
      font-size: 16px;
      .image {
        width: 100%;
      }
    }
  }
}
</style>
