<template>
  <div class="goband">
    <canvas id="chessboard">
      <p>你的浏览器不支持Canvas</p>
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const space: number = 50; // 棋盘件空格
const scale: number = 10; // 棋盘格数 scale x scale
const margin: number = 50; // 棋盘外空白

onMounted(() => {
  let canvas: HTMLCanvasElement = document.getElementById(
    "chessboard"
  ) as HTMLCanvasElement;
  canvas.width = 2 * margin + space * scale;
  canvas.height = 2 * margin + space * scale;

  let ctx = canvas.getContext("2d");
  if (ctx != null) {
    // 绘制网格
    let grid = new Path2D();
    for (let i = 0; i < scale + 1; i++) {
      const x = margin + i * space;
      const y = margin + space * scale;
      // 横
      grid.moveTo(margin, x);
      grid.lineTo(y, x);
      // 纵
      grid.moveTo(x, margin);
      grid.lineTo(x, y);
    }

    ctx.strokeStyle = "black";
    ctx.stroke(grid);
  }
});
</script>

<style lang="less" scoped>
@boardBg: #ffd75b;

.goband {
  // border: 1px solid green;
  #chessboard {
    background-color: @boardBg;
  }
}
</style>
