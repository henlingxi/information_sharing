<template>
	<view>
		<scroll-view scroll-y="true" >
			
		<view class='card' v-for="art in articles" :key="art.id"  @click="showArticle(art)">
		<view class="title">
			<view class="Left"><view>{{art.title}}</view></view>
			<view class="Right">查看详情</view>
		</view>
			<text class="content">{{art.content}}</text>
	</view>
		<!-- <uni-load-more status="more"></uni-load-more> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"ArticleListItem",
		props:['articles'],
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				console.log('a')
				this.addData(()=>{
					
				})
			},
			showArticle(art){
				if(!art.picture)art.picture="noPic"
				this.$router.push({path:"/pages/articleShowMore/articleShowMore",query:{...art}})
				// uni.navigateTo({url:`/pages/articleShowMore/articleShowMore?art=`+JSON.stringify(art)})
			}
		}
	}
</script>

<style lang="scss">
	.card{
		margin:20rpx 10rpx;
		height:360rpx ;
		border-radius: 5rpx;
		box-shadow: 0 1rpx 8rpx 4rpx #e2e2ea;
		color: #323232;
		.title{
			height: 90rpx;
			line-height: 80rpx;
			padding: 10rpx 30rpx;
			border-bottom: 1rpx solid #e2e2ea;
			.Left{
				display: inline-block;
				width: 500rpx;
				font-size: 16px;
				height: 80rpx;
				overflow: hidden;
				view{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
				}
			}
			.Right{
				display: inline-block;
				float: right;
				color: #7a70ff;
			}
		}
	.content{
			height: 190rpx;
			overflow: hidden;
			// background-color: red;
			display:-webkit-box;
			margin: 40rpx;
			
			font-size: 30rpx;
			line-height: 2;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 3;
			}
		}
</style>