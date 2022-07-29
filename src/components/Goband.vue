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
const pieceSize: number = 18; // 棋子大小（直径）


enum PlayerRole {
  White,
  Black,
}

// 棋子坐标
interface PieceCoord {
  x: number;
  y: number;
}

// 棋盘
class Chessboard {
  chessCanvas: HTMLCanvasElement; // 棋盘画布对象
  chessboardCtx!: CanvasRenderingContext2D; // 棋盘画布操作对象
  piecesCtx!: CanvasRenderingContext2D; // 棋子画布操作对象

  constructor() {
    // 初始化棋盘画布
    this.chessCanvas = document.getElementById("chessboard") as HTMLCanvasElement;

    const ctx = this.chessCanvas.getContext("2d");
    if (ctx == null) {
      console.error("init failed");
      return;
    }
    this.chessboardCtx = ctx;
    this.piecesCtx = ctx;

    // 绘制棋盘
    this.drawChessboard()

    // 事件绑定
    const self = this
    this.chessCanvas.onclick = function (e: MouseEvent) {
      // 棋盘定位转换为坐标系坐标，以棋盘左上角为(0, 0）
      const x = Math.floor((e.offsetX + space / 2 - margin) / space);
      const y = Math.floor((e.offsetY + space / 2 - margin) / space);

      const point: PieceCoord = { x, y };
      // 判断执方
      if (!self.isLegal(point)) {
        alert("落子不合法")
      } else {
        self.drawPiece(point, getPlayerRole());
      }
    }
  }

  // 构建棋盘
  drawChessboard() {
    // 设置棋盘大小
    this.chessCanvas.width = 2 * margin + space * scale;
    this.chessCanvas.height = 2 * margin + space * scale;

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

    this.chessboardCtx.strokeStyle = "black";
    this.chessboardCtx.stroke(grid);
  }

  // 画棋子
  drawPiece(point: PieceCoord, role: PlayerRole) {
    // 坐标系转换为实际棋子位置
    const x = point.x * space + margin;
    const y = point.y * space + margin;

    let ctx = this.piecesCtx;
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

  // 棋子落子是否合法
  isLegal(pos: PieceCoord): boolean {
    const { x, y } = pos;
    if (x >= 0 && y >= 0 && x <= scale && y <= scale) {
      return true;
    }
    return false;
  }
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



let chessboard: Chessboard;

onMounted(() => {
  // 构造一个棋盘
  chessboard = new Chessboard()
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
