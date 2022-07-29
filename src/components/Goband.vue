<template>
  <div class="goband">
    <canvas id="chessboard">
      <p>你的浏览器不支持Canvas</p>
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

enum PlayerRole {
  White,
  Black,
}

// 棋子坐标
interface PieceCoord {
  x: number;
  y: number;
}

const space: number = 50; // 棋盘件空格
const scale: number = 10; // 棋盘格数 scale x scale
const margin: number = 50; // 棋盘外空白
const pieceSize: number = 18; // 棋子大小（直径）

// 棋盘画布对象
let chessCanvas: HTMLCanvasElement;

// 棋盘画布操作对象
let chessboardCtx: CanvasRenderingContext2D;
// 棋子画布操作对象
let piecesCtx: CanvasRenderingContext2D;

// 构建棋盘
function drawChessboard() {
  // 设置棋盘大小
  chessCanvas.width = 2 * margin + space * scale;
  chessCanvas.height = 2 * margin + space * scale;

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

  chessboardCtx.strokeStyle = "black";
  chessboardCtx.stroke(grid);

  // 事件处理
  chessCanvas.onclick = bindBoardEvent;
}

let counter = 0;
// 获取玩家持方
function getPlayerRole(): PlayerRole {
  counter++;
  if (counter % 2 == 1) {
    return PlayerRole.Black;
  }
  return PlayerRole.White;
}

// 绑定棋盘事件
function bindBoardEvent(e: MouseEvent) {
  console.log("绑定棋盘事件");
  // console.log(e);
  console.log(e.offsetX, e.offsetY);

  // 棋盘定位转换为坐标系坐标，以棋盘左上角为(0, 0）
  const x = Math.floor((e.offsetX + space / 2 - margin) / space);
  const y = Math.floor((e.offsetY + space / 2 - margin) / space);

  console.log(x, y);
  const point: PieceCoord = { x, y };

  // 判断执方
  drawPiece(point, getPlayerRole());
}

// 画棋子
function drawPiece(point: PieceCoord, role: PlayerRole) {
  // 坐标系转换为实际棋子位置
  const x = point.x * space + margin;
  const y = point.y * space + margin;

  let ctx = piecesCtx;
  ctx.beginPath();
  ctx.arc(x, y, pieceSize, 0, 2 * Math.PI);
  ctx.closePath();

  if (role == PlayerRole.White) {
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fill();
}

onMounted(() => {
  // 初始化棋盘画布
  chessCanvas = document.getElementById("chessboard") as HTMLCanvasElement;

  const ctx = chessCanvas.getContext("2d");
  if (ctx == null) {
    console.error("init failed");
    return;
  }
  chessboardCtx = ctx;
  piecesCtx = ctx;

  // 获取并初始化棋盘
  drawChessboard();
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
