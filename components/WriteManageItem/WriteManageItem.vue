<template>
	<view class='BIGCARD' :class='removeClass'>
		
		<view class="card"   @click="showArticle(art)">
			<view class="title">
				<view class="Left"><view>{{art.title}}</view></view>
				<view class="Right">查看详情</view>
			</view>
			<text class="content">{{art.content}}</text>
		</view>
			
				<view class="btnBox">	
				<view class="state">状态 : {{art.state}}</view>
				<view class='btn1' @click='makeArticle(art.id)'>编辑文章</view>
				<view class='btn2' @click='removeArticle(art.id)'>删除文章</view>
				</view>
				
	</view>
</template>

<script>
	import {get,post} from "../../utils/request.js"
		export default {
			props:['art'],
		data() {
			return {
				removeClass:''
			};
		},
		methods:{
			showArticle(art){
				console.log(art.id)
				if(!art.picture)art.picture="noPic"
				this.$router.push({path:"/pages/articleShowMore/articleShowMore",query:{...art}})
				// uni.navigateTo({url:`/pages/articleShowMore/articleShowMore?art=`+JSON.stringify(art)})
			},
			makeArticle(id){
				uni.navigateTo({
					url: `/pages/writeManageEdit/writeManageEdit?id=${id}`
				});
			},
			removeArticle(id){
				this.removeClass = 'remove'
				post('/my/article/remove',{id:id}).then(res=>{
					if(!res.data.status)this.$store.commit('articleAbout/CHANGE',-1)
					},err=>{console.log(err)})
			}
		},
	
	
	}
</script>

<!-- if(!art.picture)art.picture="noPic" -->
					<!-- this.$store.commit('articleAbout/OWNARTICLEEDIT',art) -->
<style lang="scss" scoped>
	.BIGCARD{
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #7a70ff;
	}
.card{
		margin:20rpx 10rpx;
		height:360rpx ;
		border-radius: 10rpx;
		box-shadow: 0 1rpx 16rpx 4rpx #c9c9ce;
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
	
	.btnBox{
		width: 650rpx;
		margin: 0 50rpx;
		.state{
			display: inline-block;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			padding-right: 20rpx;
		}
		.btn1,.btn2{
			display: inline-block;
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 20rpx;
			color: #7e7e7e;
			border: 2rpx solid #7e7e7e;
		}
		.btn2{
			float: right;
		}
	}
	
	.remove{
		display: none;
	}
	
</style>
