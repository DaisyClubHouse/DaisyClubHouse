<template>
	<div>
		<a-table :columns="rankColumns" :data="rankData">
		</a-table>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const rankColumns = [
	{
		title: '玩家',
		dataIndex: 'player'
	},
	{
		title: '等级',
		dataIndex: 'level'
	},
	{
		title: '积分',
		dataIndex: 'score'
	}
]

const rankData = reactive([
	{
		id: '91or2j1',
		player: "漂浮群岛",
		level: "白银",
		score: "999",
	}
])

</script>