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
		title: '排名',
		dataIndex: 'rank',
	},
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
		rank: '#1',
		id: '91or2j1',
		player: "漂浮群岛",
		level: "钻石",
		score: "999",
	},
	{
		rank: '#2',
		id: '12r1',
		player: '小白菜',
		level: '黄金',
		score: '421'
	}
])

</script>