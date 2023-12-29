<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  (function () {
    "use strict";

    function tiltEffect(element: any, options: any) {
      var maxTilt = options.maxTilt || 15;
      var perspective = options.perspective || 1400;
      var easing = options.easing || "cubic-bezier(.03,.98,.52,.99)";
      var speed = options.speed || 1200;
      var maxGlare = options.maxGlare || 0.2;
      var scale = options.scale || 1.04;

      var rect = element?.getBoundingClientRect();

      element.addEventListener("mousemove", function (event: any) {
        var pageX = event.pageX - rect.left;
        var pageY = event.pageY - rect.top;
        var halfWidth = rect.width / 2;
        var halfHeight = rect.height / 2;
        var x = (pageX - halfWidth) / halfWidth;
        var y = (pageY - halfHeight) / halfHeight;

        var tiltX = y * maxTilt;
        var tiltY = -x * maxTilt;
        var tiltRotateX = tiltX + "deg";
        var tiltRotateY = tiltY + "deg";

        var glareElement = element.querySelector(".glare");
        if (glareElement) {
          glareElement.style.transform =
            "rotate(" + tiltRotateY + ") translateZ(0)";
          glareElement.style.opacity = (Math.abs(x) + Math.abs(y)) * maxGlare;
        }

        element.style.transform =
          "perspective(" +
          perspective +
          "px) rotateX(" +
          tiltRotateX +
          ") rotateY(" +
          tiltRotateY +
          ") scale(" +
          scale +
          ")";
        element.style.transition = "transform " + speed + "ms " + easing;
      });
    }

    var cardElement = document.querySelector(".card");
    tiltEffect(cardElement, {
      maxTilt: 15,
      perspective: 1400,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      speed: 1200,
      glare: true,
      maxGlare: 0.2,
      scale: 1.04,
    });
  })();
});
</script>

<template>
  <div class="wrapper">
    <div class="card" data-tilt>
      <div class="bg"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 3.4vh;
  margin: 0;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}

.card {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 40px;
  transform-style: preserve-3d;
}

.card .title {
  position: relative;
  z-index: 2;
  transform: translateZ(20px);
}

.card .credits {
  font-size: 1.2vh;
  letter-spacing: 0.05em;
  opacity: 0.6;
  transform: translateZ(20px);
  color: orange;
}

.card .bg {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url("../assets/SVG/head.svg");
  background-size: cover;
  background-position: center;
}
</style>
