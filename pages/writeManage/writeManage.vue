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
				this.articles = res.data.data
			},err=>{
				console.log(err)
			})
		},
	}
</script>

<!-- if(!art.picture)art.picture="noPic" -->
					<!-- this.$store.commit('articleAbout/OWNARTICLEEDIT',art) -->
<style lang="scss">
	.box{ padding-bottom: 20rpx;}
</style>
