<script lang="ts" setup>
import Wheader from "@/components/Wheader.vue";
import { useRouter } from "vue-router";
import { useMenusStore } from "@/store/menu";

const menusStore = useMenusStore();

const router = useRouter();

const gotoMessage = () => {
  router.push("/messageBoard");
  menusStore.menuIndex = 2;
};

const loginApply = () => {
  menusStore.changeDrawer();
};
</script>

<template>
  <div class="header-box pt20">
    <Wheader></Wheader>
  </div>
  <div class="friend-link-box pt20">
    <div class="content-box">
      <div class="friend-link">
        <el-card class="mb20" shadow="hover">
          <div class="header pb10 flex between">
            <span class="fz24 text-color">友链</span>
            <span class="fz20 pointer primary-hover text-color"
              ><i class="iconfont mr5 fz20">&#xe727;</i> 加入</span
            >
          </div>
          <div class="introduce mt30 pb10">
            <p>
              首先将需要接入本博客站点，然后给我
              <span class="pointer" @click="gotoMessage">私信</span>
              <span class="mr5 ml5">/</span>
              <span class="pointer" @click="loginApply">登录申请</span>
              提供您站点的如下信息：
            </p>
            <div class="mt20 mb20">
              <p>站点名称:MaiXFBlog</p>
              <p>站点链接:http://www.maixf.top/#/</p>
              <p>简短描述:一个It技术的探索者</p>
            </div>
            <p>接入成功后将会以邮件的方式通知。</p>
          </div>
          <el-divider></el-divider>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-box {
  // padding: 0 20px;
  width: 100%;
}
.friend-link-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-box {
    width: 800px;
    @media screen and (max-width: 800px) {
      max-width: 100%;
    }
    .friend-link {
      font-size: 16px;
      .header {
        border-bottom: 1px dashed #ececec;
      }
      .text-color {
        color: #757575;
      }
      .introduce {
        p {
          color: #757575;
          span {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
