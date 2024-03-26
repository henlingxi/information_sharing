<template>
	<view class="container">
		<view v-if="username" class="container"  :style="{'--bcolor':bcolor}">
			<UserCenter :bcolor='bcolor' :fcolor="fcolor" :ncolor='ncolor'></UserCenter>
		</view>
		<uni-card v-else>
		<view class="unLoad">
			<image src="../../static/logo.png"></image>
			<navigator url="/pages/login/login">点击登录</navigator>
		</view>
		</uni-card>
		 
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import {get,post} from '../../utils/request'
	export default {
		data() {
			return {
				bcolor:'white',
				fcolor:'black',
				ncolor:'#b6b6b6',
			};
		},
		computed:{
			        ...mapState('userinfoAbout',['username','nickname','email','user_pic']),
			},
			onShow(){
				this.$SwitchDorN()
				let IsDark = uni.getStorageSync('IsDark');
				if(IsDark== true) this.ncolor = 'black'
				else this.ncolor = '#fcf5ff'
			}
	}
</script>

<style lang="scss" scoprd>
	page{
		height: 100%;
	}
	
	.unLoad{
		height: 700rpx;
		padding: 200rpx;
		text-align: center;
		image{
			height: 160rpx;
			width: 160rpx;
			border-radius: 80rpx;
		}
		navigator{
			display: inline-block;
			padding: 50rpx 0 ;
			text-decoration: underline;
		}
	}

</style>
