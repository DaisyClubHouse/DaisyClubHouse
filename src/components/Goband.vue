<template>
  <div class="goband">
    <div class="operating-area">
      <a-space>
        <a-button type="primary" status="success" @click="connectNetwork()">连接服务器</a-button>
        <a-button type="primary" status="warning" @click="createRoom()">创建房间</a-button>
        <a-input-search v-model="roomInfo.code" placeholder="输入房间号" style="{ width: '230px' }" button-text="加入房间"
          @click="joinRoom()" search-button />
      </a-space>
    </div>
    <canvas id="chessboard">
      <p>你的浏览器不支持Canvas</p>
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";

import {
  createRoomRequest,
  joinRoomRequest,
  decodeMsgPack,
  MsgType,
} from './request'


const space: number = 50; // 棋件空格
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
  conn!: WebSocket;
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

  // 连接服务器
  connectServer() {
    console.log("connect server...");
    this.conn = new WebSocket("ws://localhost:9000");

    // 连接网络
    this.conn.onopen = function (event) {
      console.log(event);
      console.log("connected");
    };

    // 网络断开
    this.conn.onclose = function (event) {
      console.log(event);
      console.log("disconnected");
    };

    // 接收消息
    this.conn.onmessage = function (event) {
      console.log("recv: " + event.data);
      console.log(event);
      if (typeof event.data === "string") {
        const msg = decodeMsgPack(event.data);
        switch (msg.type) {
          case MsgType.BroadcastRoomGameBeginning:
            console.log("游戏开始");
            // TODO 
            break;
        }
        console.log(msg);
      }
    }
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

// 连接网络
function connectNetwork() {
  chessboard.connectServer();
}

// 创建房间
function createRoom() {
  let conn = chessboard.conn;
  if (conn == null) {
    alert("请先连接网络")
    return;
  }
  const pack = createRoomRequest("测试创建房间标题");
  // 发送ws消息
  conn.send(pack)
}

// 房间信息定义
const roomInfo = reactive({
  code: "",
})
// 加入房间
function joinRoom() {
  let conn = chessboard.conn;
  if (conn == null) {
    alert("请先连接网络")
    return;
  }
  if (roomInfo.code == "") {
    alert("请输入房间号")
    return;
  }
  const pack = joinRoomRequest(roomInfo.code);
  conn.send(pack);
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

  .operating-area {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 10px;
  }

  // border: 1px solid green;
  #chessboard {
    background-color: @boardBg;
  }
}
</style>
