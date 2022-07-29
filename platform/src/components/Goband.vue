<template>
  <div class="goband">
    <canvas id="chessboard" width="500" height="500">
      <p>你的浏览器不支持Canvas</p>
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;

  let ctx = canvas.getContext("2d");
  if (ctx != null) {
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 55, 50);
  }
});
</script>

<style lang="less" scoped>
@boardBg: #ffd75b;

.goband {
  border: 1px solid green;
  #chessboard {
    background-color: @boardBg;
  }
}
</style>
