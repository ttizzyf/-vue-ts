<script lang="ts" setup>
import Wheader from "@/components/Wheader.vue";
import { ref, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import { useMenusStore } from "@/store/menu";
import { useUserStore } from "@/store/user";
import { getAdminFriendList } from "@/api/common.ts";
import { friendLinkItem } from "@/types/common";

const menusStore = useMenusStore();

const userStore = useUserStore();

const router = useRouter();

const gotoMessage = () => {
  router.push("/messageBoard");
  menusStore.menuIndex = 2;
};

const friendList: Ref<Array<friendLinkItem>> = ref([]);

// 图片列表地址
const imgList = [
  "../../../public/1.jpg",
  "../../../public/2.jpg",
  "../../../public/3.jpg",
  "../../../public/4.jpg",
  "../../../public/5.jpg",
  "../../../public/6.jpg",
  "../../../public/7.jpg",
];

// 获取前台友链列表
const getAdminFriendListAPI = async () => {
  const res = await getAdminFriendList();
  friendList.value = res.data.data.rows;
  console.log(friendList.value);
};

const loginApply = () => {
  menusStore.changeDrawer();
};

// 页面跳转
const jumpTo = (link: string) => {
  window.open(link);
};

// 加入友链
const joinFriendLink = () => {
  if (userStore.LoginInfo) {
    menusStore.changeDrawer();
  } else {
    router.push("/messageBoard");
    menusStore.menuIndex = 2;
  }
};

onMounted(() => {
  getAdminFriendListAPI();
});
</script>

<template>
  <div class="header-box pt20">
    <Wheader></Wheader>
  </div>
  <div class="friend-link-box pt20">
    <div class="content-box">
      <div class="friend-link">
        <div class="header pb10 flex between">
          <span class="fz24 text-color">友链</span>
          <span
            @click="joinFriendLink"
            class="fz20 pointer primary-hover text-color"
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
            <p>
              站点链接:
              {{
                menusStore.webSetting.webInfo.webConnect ||
                "http://www.maixf.top/#/"
              }}
            </p>
            <p>
              简短描述:{{
                menusStore.webSetting.webInfo.webIntroduce ||
                "一个It技术的探索者"
              }}
            </p>
          </div>
          <p>接入成功后将会以邮件的方式通知。</p>
        </div>
        <el-divider></el-divider>
      </div>
      <div class="friend-link-list">
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in friendList"
            :key="item.id"
            :xs="24"
            :sm="12"
            :md="8"
          >
            <div class="friend-link-item flex column pointer">
              <div @click="jumpTo(item.link)" class="border-box center">
                <div class="image-box center">
                  <el-image
                    style="width: 200px; height: 200px"
                    :src="imgList[index]"
                    fit="cover"
                  />
                </div>
                <div class="mask center">跳转</div>
                <div class="border-right"></div>
                <div class="border-left"></div>
                <div class="border-right trans"></div>
                <div class="border-left trans"></div>
              </div>
              <div class="web-info flex column mt20">
                <div class="title">
                  {{ item.linkName }}
                </div>
                <div class="introduce">
                  {{ item.describe }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
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
        border-bottom: 1px dashed #ffffff;
      }
      .text-color {
        color: #ffffff;
      }
      .introduce {
        p {
          color: #ffffff;
          span {
            color: $primary;
          }
        }
      }
    }
    .friend-link-list {
      .friend-link-item {
        margin-bottom: 60px;
        .border-box {
          position: relative;
          height: 240px;
          width: 240px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.5s ease;

          &:hover {
            .mask {
              color: #ffffff;
              background-color: rgba(0, 0, 0, 0.9);
            }
            .trans {
              transform: rotate(90deg);
            }
          }
          .border-right {
            position: absolute;
            height: 240px;
            width: 240px;
            border-radius: 50%;
            border-top: 4px solid transparent;
            border-right: 4px solid #ffffff;
            border-bottom: 4px solid transparent;
            transition: all 400ms linear;
          }
          .border-left {
            position: absolute;
            height: 240px;
            width: 240px;
            border-radius: 50%;
            border-top: 4px solid transparent;
            border-left: 4px solid #ffffff;
            border-bottom: 4px solid transparent;
            transition: all 400ms linear;
          }
        }
        .image-box {
          position: relative;
          height: 200px;
          width: 200px;
          border-radius: 50%;
          overflow: hidden;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          font-size: 24px;
          border-radius: 50%;
          color: transparent;
          background-color: rgba(0, 0, 0, 0); /* 初始时背景透明 */
          transition: background-color 0.5s ease; /* 过渡效果，背景色变化 */
          pointer-events: none; /* 防止遮罩拦截鼠标事件 */
        }
        .web-info {
          .title {
            font-size: 20px;
          }
          color: #cdcdcd;
        }
      }
    }
  }
}
</style>
