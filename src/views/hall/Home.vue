<template>
	<div class="hall">
		<div class="room">
			<span>游戏大厅</span>
			<div>
				<a-table :columns="columns" :data="data">
				</a-table>
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

const columns = [
	{
		title: '序号',
		dataIndex: 'id',
	},
	{
		title: '排名',
		dataIndex: 'rank',
	},
	{
		title: '房间名称',
		dataIndex: 'name'
	},
	{
		title: '房间状态',
		dataIndex: 'status',
	},
	{
		title: '创建人',
		dataIndex: 'creator'
	},
	{
		title: '创建时间',
		dataIndex: 'createTime'
	}
]

const data = reactive([{
	id: 1,
	name: '棋盘大战',
	status: 'waiting',
	creator: '张三',
	createTime: '十分钟前',
}])

onMounted(() => {
	console.log("init")
});
</script>

<style scoped lang="less">
.hall {
	display: flex;

	>* {
		border: 1px solid red;
	}

	.room {
		padding: 20px;
	}

	.rank {
		padding: 20px;
	}
}
</style>