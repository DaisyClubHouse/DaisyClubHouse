<template>
	<div>
		<a-table :columns="roomColumns" :data="roomData" size="small">
			<template #status="{ record }">
				<a-tag v-if="record.status == 'waiting'" color="orange">等待中</a-tag>
				<a-tag v-else-if="record.status == 'playing'" color="green">进行中</a-tag>
			</template>
			<template #createTime="{ record }">
				{{ dayjs(record.createTime).toNow() }}
			</template>
			<template #action="{ record }">
				<a-button v-if="record.status == 'waiting'" type="primary" status="success" size="mini">加入房间</a-button>
				<a-button v-else-if="record.status == 'playing'" type="primary" status="warning" size="mini"
					:disabled="true">进入观战
				</a-button>
			</template>
		</a-table>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn') // 加在国际化配置
dayjs.extend(relativeTime)

const roomColumns = [
	{
		title: '序号',
		dataIndex: 'id',
	},
	{
		title: '房间名称',
		dataIndex: 'name'
	},
	{
		title: '房间状态',
		slotName: 'status',
		align: 'center'
	},
	{
		title: '创建人',
		dataIndex: 'creator',
		align: 'center'
	},
	{
		title: '创建时间',
		slotName: 'createTime',
		align: 'center'
	},
	{
		title: '操作',
		slotName: 'action',
		align: 'center'
	}
]

const roomData = reactive([{
	id: 1,
	name: '棋盘大战',
	status: 'waiting',
	creator: '张三',
	createTime: '2022-08-08 23:38:00',
}, {
	id: 2,
	name: '房间标题2',
	status: 'playing',
	creator: '漂浮群岛',
	createTime: '2022-08-08 23:54:00'
}])

</script>

<style scoped lang="less">
</style>