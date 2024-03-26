<template>
	<view>
		<uni-card>
			<view>注销用户</view>
			<button @click="goodbye">确认注销</button>
		</uni-card>
		<uni-card v-if="show">
			<view class="message">想注销?不可能</view>
		</uni-card>
		<button @click="changeLN">切换模式</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		},
		methods:{
			goodbye(){
				console.log("注销?不可能")
				this.show=true
			},
			changeLN(){
					let OldIsDark = uni.getStorageSync('IsDark')
					
					this.isDark = !OldIsDark
					uni.setStorageSync("IsDark",this.isDark)
				
					uni.switchTab({url:'/pages/center/center'})
					
				}
			},
		
		onshow() {
			this.$SwitchDorN()
		}
	}
</script>

<style lang="scss">
	.message{
		width: 100%;
		text-align: center;
		color: red;
	}
</style>
