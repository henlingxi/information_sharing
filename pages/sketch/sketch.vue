<template>
	<view class="box">
		
		<view v-for="art in articles" :key="art.id" style="margin: 20rpx 0;">
		<WriteManageItem :art="art"></WriteManageItem>
		</view>
	</view>
</template>

<script>
	import {get,post} from "../../utils/request.js"
		export default {
		data() {
			return {
				articles:[]
			};
		},
		onLoad(){
			get('/my/article/getSelf').then(res=>{
				const arts = res.data.data
				this.articles = arts.filter(item=>{
					if(item.state == 'sketch'){
						return item
					}
				})
			},err=>{
				console.log(err)
			})
		}
	}
</script>

<style lang="scss">
	.box{ padding-bottom: 20rpx;}
</style>
