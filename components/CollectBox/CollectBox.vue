<template>
					<view class="example-body">
					<view class="title">{{sum+'人收藏了该文章'}}</view>	
					<uni-fav :checked="checkList" class="favBtn" @click="favClick()" />
					</view>
</template>

<script>
	import {post} from '../../utils/request.js' 
	export default {
		name:"CollectBox",
		props:["articleid"],
		data() {
			return {
				//收藏
					checkList: false,
					sum:0
			};
		},
		methods:{
			favClick() {
				const article_id=this.articleid-0
				post('/my/comment/collect',{article_id}).then(res=>{
					if(res.data.status == 0){
						this.checkList = !this.checkList
						this.sum+=res.data.data
						this.$store.commit('collectAbout/CHANGE',res.data.data)
						this.$forceUpdate()
					}
				},err=>{
					console.log(err)
				})
					
				}
		},
		mounted(){
		
			const article_id=this.articleid-0
			post('/my/comment/collectGet',{article_id}).then(res=>{
				if(res.data.status == 0){
					this.checkList = res.data.data
				}
			},err=>{
				console.log(err)
			})
			post('/api/article/collectLength',{article_id}).then(res=>{
				if(res.data.status == 0){
					this.sum = res.data.data
				}
			},err=>{
				console.log(err)
			})
				
			
		}
	}
</script>

<style lang="scss">
	.example-body {
		width: 650rpx;
		margin: 50rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #d5d5d5;
		margin-bottom: 150rpx;
		// padding: 10px 15px;
	.title{
		display: inline-block;
	}
	.favBtn{
		width: 140rpx;
		float: right;
		}

	}
	// /* #ifdef MP-ALIPAY */
	// .uni-fav {
	// 	float: right;
	// 	margin-left: 20rpx;
	// }

	// /* #endif */
	
</style>