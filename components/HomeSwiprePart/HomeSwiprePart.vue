<template>
	<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="3000"duration="1000">
		<swiper-item>
			<view><image mode="aspectFill" src='../../static/images/c77a59d60ca22ef1b4acf8c33472ea6.jpg'/></view>
		</swiper-item>
		<swiper-item>
			<view><image mode="aspectFill"  src='../../static/images/233ddb4fa656ed04564d758d1afe509.jpg'/></view>
		</swiper-item>
		<swiper-item>
			<view><image mode="aspectFill"  src='../../static/images/4a6ac0786e5515a6e8c20b6dd4dfd05.jpg'/></view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name:"SwiprePart",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		height: 350rpx;
	}
	image{
		width: 750rpx;
	}
</style>