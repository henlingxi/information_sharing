<template>
	<view class='comment'>
			<view class='commentHead'>{{list.nickname}}<text>{{showTime}}</text></view>
			<view class="content">{{list.content}}</view>
	</view>
</template>

<script>
	export default {
		name:"CommentItem",
		props:['list'],
		data() {
			return {
				flag:''
			};
		},
		computed:{
			showTime(){
				const time = this.list.time-0
				return this.SHOWTIME(time,1)
			}
		},
		mounted(){
			this.flag = (this.list.length == 0)?false:true
		}
	}
</script>

<style lang="scss" scoped>
	.comment{
		width: 700rpx;
		padding: 20rpx;
		margin: 20rpx 25rpx;
		border-radius: 5rpx;
		// box-shadow: 0 0 6rpx 1rpx #c7c7c7;
		border-bottom: 2rpx solid #afafaf;
	}
	.commentHead{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 16px;
		border-bottom: 2rpx solid #d7efff;
		text{
			float: right;
			font-size: 10px;
			color: #0055ff;
		}
	
	}
	.content{
		min-height: 50rpx;
		padding: 20rpx 0;
	}
</style>