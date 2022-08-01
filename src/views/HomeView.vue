<script setup lang="ts">
import Goband from "@/components/Goband.vue";
</script>

<template>
  <div class="goband-wrapper">
    <div class="chessboard">
      <span class="title">五子棋</span>
      <Goband />
    </div>
    <div class="sidebar">
      <a-card :style="{ width: '360px' }" title="房间信息">
        <template #extra>
          <a-link>More</a-link>
        </template>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in
        China and around the world. Toutiao started out as a news recommendation
        engine and gradually evolved into a platform delivering content in various
        formats.
      </a-card>

      <div>
        <div class="player">
          <div class="left-side">
            <a-avatar :size="64">
              <img alt="avatar" src="https://joeschmoe.io/api/v1/male/random" />
            </a-avatar>
          </div>
          <div class="player-basic">
            <span>
              <a-typography-text>玩家昵称：</a-typography-text>
              <a-typography-text type="success">漂浮群岛</a-typography-text>
            </span>
            <span>
              <a-typography-text>胜率：</a-typography-text>
              <a-typography-text type="warning">45%</a-typography-text>
              胜45场 败50场 平5场
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.goband-wrapper {
  display: flex;
  // flex-direction: column;
  // justify-content: center;


  .chessboard {
    border: 1px solid red;

    .title {
      font-size: 20px;
      text-align: center;
    }
  }

  .sidebar {
    // border: 1px solid green;
    margin-left: 20px;

    .player {
      display: flex;
      border: 1px solid rgb(235, 235, 235);
      height: 66px;
      margin: 10px 0;

      .left-side {
        height: 100%;
      }

      .player-basic {
        // border: 1px solid green;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        span {
          // border: 1px solid green;
        }
      }
    }
  }
}
</style>
