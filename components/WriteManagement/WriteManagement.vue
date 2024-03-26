<template>
	<view>
	<uni-card class="Managementcard"@click="toWriteManagement">
		<text>管理</text>
	</uni-card>
	</view>
</template>

<script>
	export default {
		name:"WriteManagement",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.Managementcard{
		height: 600rpx;
		text{
			line-height: 600rpx;
		}
	}
</style>