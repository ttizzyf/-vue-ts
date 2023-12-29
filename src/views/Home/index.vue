<script lang="ts" setup>
import WSectionHeader from "@/components/WSectionHeader.vue";
import selfIntroduce from "./components/selfIntroduce.vue";
</script>

<template>
  <div>
    <div class="introduct-self mt20">
      <selfIntroduce></selfIntroduce>
      <WSectionHeader :title="'INTRODUCE'"></WSectionHeader>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.introduct-self {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
