<script setup lang="ts">
import Goband from "@/components/Goband.vue";
</script>

<template>
  <div class="goband-wrapper">
    <span class="title">五子棋</span>
    <Goband />
  </div>
</template>

<style lang="less" scoped>
.goband-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-size: 20px;
    text-align: center;
  }
}
</style>
