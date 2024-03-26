<template>
	<view>
		<uni-card class="article" >
			<view class="title">{{article.title}}</view>
			<view style="padding: 0 0 20rpx 20rpx; color: green; font-size: 26rpx; text-align: start;" v-if="presentState"> #{{presentState.name}}</view>
			<text >{{article.content}}</text>
		</uni-card>
		
		
	<!-- 收藏 -->
		<view class="tip"><view class="time"> {{showTimeSymple}}  </view>
		<view class="author"> {{'by:'+authorInfo.nickname}} </view></view>
		<CollectBox  :articleid="article.id"></CollectBox>

	<!-- 评论 -->
	<!-- <uni-card> -->
	<view class="input">	
	<input type="text" placeholder="快来写评论吧" v-model="comment" style="display: inline-block;">
	<button style="display: inline-block;" @click.stop="push">提交</button>
	</view>
	<view style="color: red;">	{{message}}</view>
	<!-- </uni-card> -->
	
	<view v-if="resComments">
	<view v-for="(item,index) in resComments" :key="index">
		<view class='comment'>
				<view class='commentHead'>{{usernickname}}<text>{{item.time}}</text></view>
				<view class="content">{{item.content}}</view>
		</view>
		
	</view>
	</view>
		
		<view v-if="commentList.length">
		<template v-for="(list,index) in commentList">
			<CommentItem :list='list'></CommentItem>
		</template>
		</view>
		<view v-if="!commentList.length">
			<view style="text-align: center;">没有评论 快来抢沙发</view>
		</view>
	</view>
</template>

<script>
	import {get,post} from "../../utils/request.js"
	export default {
		data() {
			return {
				// id cate_id title content time author_id picture isdelete state
				article:{},
				// id username nickname email user_pic state 
				authorInfo:{},
				artCate:[],
				presentState:'',
				//
				comment:'',
				commentList:'',
				resComments:[],
			
				//
				message:'',
				usernickname:'您的评论'
			};
		},
		methods:{
			//新建评论
			push(){
				if(!this.comment){this.message="不能为空"; return}
				this.message=""
				const id = this.article.id-0
				post('/my/comment/add',{article_id:id,content:this.comment}).then(res=>{
					this.ShowNewComment=true
					const time = this.SHOWTIME(res.data.data.resInfo.time,1)
					const resInfo = {...res.data.data.resInfo,time:time}
					const resComments = this.resComments
					this.resComments = [ resInfo ,...resComments]
					this.comment=""
					},err=>{console.log(err)})
			}
		},
		computed:{
			showTimeSymple(){
				return this.SHOWTIME(this.article.time)
			}
			
			// showTime(){
			// 		return this.SHOWTIME(this.article.time,1)
			// }
		},
	
		
		onLoad(article){
			this.article=article
			const id = article.id-0
			//评论加载
			post('/api/article/getComment',{article_id:id}).then(res=>{
				this.commentList = res.data.data.results
			})
			//文章作者信息获取
			post('/api/article/authorInfo',{id:article.author_id}).then(res=>{
				this.authorInfo =res.data.data
				},err=>{console.log(err)})
				
					this.artCate = this.$store.state.artcateAbout.artcate
						const filCate = this.artCate.filter((cate)=>{
									if(cate.id == this.article.cate_id)
									return cate
								})
								this.presentState = filCate[0]
				
		},
		// onShow(){
		// 	this.usernickname = this.$store.state.userinfoAbout.nickname
		// }
	}
</script>

<style lang="scss">
	.article{
		min-height: 400rpx;
	}
	.title{
		padding-top: 20rpx;
		font-size: 20px;
		font-weight: 800;
		margin-bottom: 40rpx;
	}
	.tip{
		width: 650rpx;
		margin: 0 50rpx;
		.time{
			color: #0055ff;
			display: inline-block;
		}
		.author{
			display: inline-block;
			float: right;
		}
	}
	.input{
		width: 650rpx;
		margin: 0 50rpx;
		button{
			float: right;
			width: 120rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #0055ff;
			
		}
		input{
			height: 60rpx;
			line-height: 60rpx;
			width: 500rpx;
			border-bottom: 1rpx solid gray;
		}
	}
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
