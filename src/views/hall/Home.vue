<template>
	<div class="hall">
		<div class="room">
			<div>
				<a-carousel :style="{
					width: '600px',
					height: '240px',
				}" :auto-play="true" indicator-type="dot" show-arrow="hover">
					<a-carousel-item v-for="image in images">
						<img :src="image" :style="{
							width: '100%',
						}" />
					</a-carousel-item>
				</a-carousel>
			</div>
			<div class="list">
				<Room />
			</div>
		</div>
		<div class="rank">
			<div class="rank-title">
				<a-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
					<div :style="{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}">
						<span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
							<a-avatar :style="{ marginRight: '8px', backgroundColor: '#165DFF' }" :size="28">
								A
							</a-avatar>
							<a-typography-text>Username</a-typography-text>
						</span>
						<a-link>More</a-link>
					</div>
				</a-card>
			</div>
			<div class="rank-content">
				<Rank />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import Rank from './components/rank.vue';
import Room from './components/room.vue';

const images = [
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
];


onMounted(() => {
	console.log("init")
});
</script>

<style scoped lang="less">
.hall {
	display: flex;

	>* {
		// border: 1px solid red;
	}

	.room {

		.list {
			margin-top: 40px;
		}

	}

	.rank {
		padding-left: 20px;
	}
}
</style>