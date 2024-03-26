<template>
	<view class="container">
		<scroll-view scroll-x="true" class="scrollView" >
			<view class="view" ><text class="view" @click="checkCate()">全部</text></view>	
			<view class="view" v-for="item in cateArray" :key="item.id">
				<text class="view" @click="checkCate(item.id)">{{item.name}}</text></view>	
		</scroll-view>
		<view style="height: 80rpx;"></view>
		<!-- 轮播图组件 -->
		<HomeSwiprePart></HomeSwiprePart>
		<!-- 分类 -->
		<ArticleListItem :articles='articles'></ArticleListItem>
	
	</view>
</template>

<script>
	import {get} from "../../utils/request.js"
	export default {
		data() {
			return {
				cateArray:[],
				articles:[]
			}
		},
		methods:{
			checkCate(id=0){
				if(id !== 0){
					get('/api/article/get',{cate_id:id}).then(res=>{
						this.articles = res.data.data
					},err=>{
						console.log(err)
					})
				}
				else{
					get('/api/article/get').then(res=>{
						this.articles = res.data.data
					},err=>{
						console.log(err)
					})
				}
			},
			
		},
		onLoad(){
			this.artcate = this.$store.state.artcateAbout.artcate
			// if(!this.$store.state.userinfoAbout.username)uni.removeStorageSync('token')
		},
		mounted(){
			//文章分类
			get('/api/cates').then(res=>{
				const value = res.data.data.results
				this.cateArray = value
				this.$store.commit('artcateAbout/GETCATE',value)
				},err=>{console.log(err)}),
			//文章获取
			get('/api/article/get').then(res=>{
				this.articles = res.data.data
			},err=>{
				console.log(err)
			})
		}
	}
</script>

<style lang="scss" scoped>
	
	.scrollView{
		z-index: 10;
		height: 80rpx;
		box-shadow: 0 0 6rpx 5rpx #aaaaff;
		white-space: nowrap;
		position: fixed;
		background-color: white;
		.view{
			font-size: 20px;
			height: 80rpx;
			width: 150rpx;
			display: inline-block;
			line-height: 80rpx;
			padding: 0 30rpx;
			background-color: #fff;
			margin: 0 5rpx;
			color: #323232;
		}
	}
</style>