<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// @ts-ignore
import debounce from "lodash/throttle";
import "element-plus/theme-chalk/display.css";
import WSectionHeader from "@/components/WSectionHeader.vue";

const router = useRouter();
// 是否为处于首页
const isHomePage = computed(() => {
  if (router.currentRoute.value.name !== "home") {
    return true;
  } else {
    return false;
  }
});

// 岗位名称
const PostName = ref(import.meta.env.VITE_APP_WEB_TITLE);
// 每日一句话
const famousSaying = ref(import.meta.env.VITE_APP_FAMOUS_SAYING);
// 控制眼球移动
const EyesMove = () => {
  // 获取眼球元素和眼球点元素
  const leftEye: HTMLElement = document.querySelector(".leftEye")!;
  const rightEye: HTMLElement = document.querySelector(".rightEye")!;
  const leftPoint: HTMLElement = document.querySelector(".leftPoint")!;
  const rightPoint: HTMLElement = document.querySelector(".rightPoint")!;

  // 获取眼球元素的父盒子
  const eyeContainer: HTMLElement = document.querySelector(
    ".self-introduce-box"
  )!;
  // 检查是否成功获取到 eyeContainer
  if (!eyeContainer) {
    console.error("Cannot find .selfIntroduction element.");
  } else {
    // 计算眼球的中心坐标
    const eyeCenter = {
      left: leftEye.offsetLeft + leftEye.offsetWidth / 2,
      top: leftEye.offsetTop + leftEye.offsetHeight / 2,
    };

    // 计算鼠标相对于眼球中心的坐标
    function getMousePosition(event: any) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const deltaX = mouseX - eyeCenter.left;
      const deltaY = mouseY - eyeCenter.top;
      return { deltaX, deltaY };
    }

    // 更新眼球点的位置
    function updateEyePosition(
      eye: HTMLElement,
      point: HTMLElement,
      deltaX: number,
      deltaY: number
    ) {
      // 计算鼠标相对于眼球中心的角度
      const angle = Math.atan2(deltaY, deltaX);

      // 计算眼球点的新位置
      const pointRadius = eye.offsetWidth / 2 - point.offsetWidth / 2;
      const newX = pointRadius * Math.cos(angle);
      const newY = pointRadius * Math.sin(angle);

      // 设置眼球点的新位置
      point.style.transform = `translate(${newX}px, ${newY}px)`;
    }
    const throttledMouseMove = debounce((event: any) => {
      const { deltaX, deltaY } = getMousePosition(event);
      // 更新左眼位置
      updateEyePosition(leftEye, leftPoint, deltaX, deltaY);
      // 更新右眼位置
      updateEyePosition(rightEye, rightPoint, deltaX, deltaY);
    }, 50);

    eyeContainer.addEventListener("mousemove", throttledMouseMove);
  }
};

// 跳转页面
const jumpTo = (url: string) => {
  window.open(url, "_blank");
};

onMounted(() => {
  if (!isHomePage.value) {
    EyesMove();
  }
});
</script>

<template>
  <div class="self-introduce-box">
    <div class="avatar-box flex jcenter mb20">
      <div class="avatar flex jcenter pd12">
        <img class="lazy-image h100 w100" src="../../../assets/SVG/head.svg" />
        <div class="leftEye">
          <div class="leftPoint"></div>
        </div>
        <div class="rightEye">
          <div class="rightPoint"></div>
        </div>
      </div>
      <div class="infoBox ml20 caps fw700 fz24">
        <div class="name">{{ PostName }}</div>
        <div class="fz14">
          <el-text class="saying" line-clamp="2">
            {{ famousSaying }}
          </el-text>
        </div>
        <div class="iconBox flex">
          <i
            @click="jumpTo('https://gitee.com/yequcailingzhi')"
            class="iconfont fz24 icon mr10 pointer"
            >&#xe686;</i
          >
          <i
            @click="jumpTo('https://github.com/ttizzyf')"
            class="iconfont fz24 icon pointer"
            >&#xe673;</i
          >
        </div>
      </div>
    </div>
    <WSectionHeader
      class="WSectionHeader"
      :title="'introduce'"
    ></WSectionHeader>
    <div class="mt20">
      <el-row :gutter="20">
        <el-col class="hidden-md-and-down" :lg="2">
          <div class="self-box pointer">个人简介</div>
        </el-col>
        <el-col :sm="12" :md="6" :lg="5">
          <div class="grid-item skill flex column pointer mb20">
            <el-popover
              :width="300"
              placement="top"
              popper-class="popver-class"
            >
              <template #reference>
                <el-text line-clamp="1" class="skillName"
                  >Vue、React、Node、Electron、React
                  Native、THREE、WebRTC、WebGL、MySQL、HTTP、Uniapp、wx小程序、Linux、移动端适配、Markdown语法、Session、Cookie、Redis、Sequelize、Vite、Webpack
                </el-text>
              </template>
              <template #default
                >Vue、React、Node、Electron、React
                Native、THREE、WebRTC、WebGL、MySQL、HTTP、Uniapp、wx小程序、Linux、移动端适配、Markdown语法、Session、Cookie、Redis、Sequelize、Vite、Webpack</template
              >
            </el-popover>
            <div class="line"></div>
            <div class="skill">个人技术栈</div>
          </div>
        </el-col>
        <el-col :sm="12" :md="6" :lg="5">
          <div class="grid-item skill flex column pointer mb20">
            <el-popover
              :width="300"
              placement="top"
              popper-class="popver-class"
            >
              <template #reference>
                <el-text line-clamp="1" class="skillName"
                  >Vue3、TS、Node.js、Vite、Sequelize、Vite、Pinia、Mysql、Redis、Element-Plus
                </el-text>
              </template>
              <template #default
                >Vue3、TS、Node.js、Vite、Sequelize、Vite、Pinia、Mysql、Redis、Element-Plus</template
              >
            </el-popover>
            <div class="line"></div>
            <div class="skill">本项目框架</div>
          </div>
        </el-col>
        <el-col :sm="12" :md="6" :lg="5">
          <div class="grid-item flex column experience pointer mb20">
            <div>2+</div>
            <div class="line"></div>
            <div>实战经验</div>
          </div>
        </el-col>
        <el-col :sm="12" :md="6" :lg="5">
          <div class="grid-item project flex column pointer mb20">
            <div>20+</div>
            <div class="line"></div>
            <div>项目经验</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.self-introduce-box {
  .avatar-box {
    .avatar {
      position: relative;
      height: 128px;
      width: 128px;
      background-color: #ffffff;
      .leftEye {
        position: absolute;
        top: 40px;
        height: 20px;
        width: 20px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        .leftPoint {
          height: 6px;
          width: 6px;
          border-radius: 3px;
          background-color: #000;
        }
      }
      .rightEye {
        position: absolute;
        right: 30px;
        top: 40px;
        height: 20px;
        width: 20px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        .rightPoint {
          height: 6px;
          width: 6px;
          border-radius: 3px;
          background-color: #000;
        }
      }
    }
    .infoBox {
      width: calc(100% - 128px);
      height: 128px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        color: $seconed;
        font-family: "Poppins", sans-serif;
      }
      .saying {
        color: $seconed;
      }
    }
    .iconBox {
      height: 30px;
      .icon {
        color: $seconed;
      }
    }
  }

  .self-box {
    height: 135px;
    width: 64px;
    text-align: center;
    padding: 18px;
    border-radius: 10px;
    background-color: $seconed;
  }
}
.WSectionHeader {
  @media screen and (min-width: 768px) {
    display: none;
  }
}
.grid-item {
  flex: 0 0 calc(25% - 20px);
  background-color: #fff;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  transition: all 0.3s linear;
  &:hover {
    transform: translateY(-4px) scale(1.02);
  }
  .skill {
    .skillName {
      color: #000;
    }
  }
}
</style>
