<template>
	<view>
		<uni-card>
			<text space="ensp">用 户 名 :  {{username}}</text><br>
			<text space="ensp">昵    称 :  {{nickname}}</text><br>
			<text space="ensp">邮    箱 ： {{email}}</text><br>
		</uni-card>
		<centerUpdateUserInfo></centerUpdateUserInfo>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:'userInfo',
		data() {
			return {
				
			};
		},
		computed:{
			        ...mapState('userinfoAbout',['username','nickname','email','user_pic'])
			}
	}
</script>

<style lang="scss">

</style>
