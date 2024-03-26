<template>
	<view>
		<ArticleListItem :articles='articles'></ArticleListItem>
		<view style="text-align: center;margin-top: 200rpx;" v-if='!length'><view style="margin: 100rpx;">还没有喜欢的文章，快去添加吧</view><image style="height: 100rpx;width:100rpx;" src="../../static/images/writing.png"></image></view>
	</view>
</template>

<script>
	import {post} from '../../utils/request.js'
	export default {
		data() {
			return {
				articles:[],
				length:0
			};
		},
		onLoad(){
			post('/my/comment/collectOwn').then(res=>{
				this.articles = res.data.data
				this.length = res.data.data.length
			},err=>{
				console.log(err)
			})
			}
		}
</script>

<style lang="scss">

</style>
