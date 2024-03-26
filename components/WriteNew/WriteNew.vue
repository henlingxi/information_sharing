<template>
	<view>
		<uni-card class="Newcard" @click="toWriteNew">
			<text>新建文章</text>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"WriteNew",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.Newcard{
		height: 300rpx;
		text{
			height: 300rpx;
			line-height: 300rpx;
		}
	}
</style>