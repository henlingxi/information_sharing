<template>
	<view class='bigbox' :style="{'--bcolor':bcolor}">
		<image class='img' mode="aspectFill" src='../../static/images/244588-cityscapes-bridges-urban.jpg'></image>
		<view class='user' @click="routerTo('userInfo')">
			<image class="userimg" mode="aspectFill" src='../../static/images/6c43fb288a20cea3306ab14c87baeeeb313580179.png@1295w.webp'></image>
			<view class='userword'><view :style="{'--fcolor':fcolor}">{{sayHello}}</view> <view :style="{'--fcolor':fcolor}">{{nickname}}</view>	</view>  <view class="userimgD">{{myArtLength*9}}</view><image src='../../static/images/胡萝卜.png'></image>
		</view>
		<view class='nav'>
			<view @click="routerTo('writeManage')"> 				<view :style="{'--fcolor':fcolor}">{{myArtLength}}</view> <view :style="{'--fcolor':fcolor}">创作</view> </view>
			<view class='middleNav' @click="toWorship"> <view :style="{'--fcolor':fcolor}">{{worshipLength}}</view> <view :style="{'--fcolor':fcolor}">关注</view> </view>
			<view @click="routerTo('collect')"> 					<view :style="{'--fcolor':fcolor}">{{collectLengrh}}</view> <view :style="{'--fcolor':fcolor}">收藏</view> </view>
		</view>
		<!--  -->
		<view class="cards" is-full @click="routerTo('daily')">
			<uni-icons color="orange" type="calendar" size="20"></uni-icons><text :style="{'--fcolor':fcolor}">每日签到</text><uni-icons color="gray" type="right" size="20" style="float: right;"></uni-icons>
		</view >
			<view  class="cards" is-full @click="routerTo('sketch')">
			<uni-icons color="green" type="mail-open-filled" size="20"></uni-icons>	<text :style="{'--fcolor':fcolor}">草稿箱</text><uni-icons color="gray" type="right" size="20" style="float: right;"></uni-icons>
			</view >
		<!--  -->
		<view class="cards" is-full @click="routerTo('settings')">
			<uni-icons color="blue" type="gear" size="20"></uni-icons><text :style="{'--fcolor':fcolor}">设置</text><uni-icons color="gray" type="right" size="20" style="float: right;"></uni-icons>
		</view >
		<view class="cards" is-full @click="logout">
			<uni-icons color="red" type="trash" size="20"></uni-icons><text :style="{'--fcolor':fcolor}">退出</text><uni-icons color="gray" type="right" size="20" style="float: right;"></uni-icons>
		</view>
	</view>
</template>
<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import {get,post} from '../../utils/request'
	export default {
		name:'UserCenter',
		props:['bcolor','fcolor','ncolor'],
		data() {
			return {
				articleLength:0,
				Clength:0,
				worshipLength:9,
				hour:0,
			};
		},
		methods:{
			routerTo(p){
				this.$Router.push({
					 path:"/pages/"+p+"/"+p
				})
			},
			toWorship(){
				console.log('好耶')
			},
			logout(){
				uni.removeStorageSync("token")
				this.$store.commit('userinfoAbout/REMOVEUSER')
				this.$store.commit('articleAbout/REMOVE')
				this.$store.commit('collectAbout/REMOVE')
				}
		},
		computed:{
				...mapState('userinfoAbout',['username','nickname','email','user_pic']),
				sayHello(){
							if (this.hour >= 4 && this.hour < 12) return "早上好";
							else if (this.hour >= 12 && this.hour < 18) return "下午好";
							else return "晚上好";
						},
				collectLengrh(){
					const change = this.$store.state.collectAbout.collectSum
					if(change)return change
					return this.Clength
				},
				myArtLength(){
					const change = this.$store.state.articleAbout.ownArticleSum
					if(change)return change
					return this.articleLength
				}
			},
			mounted(){
				// this.$store.dispatch('collectAbout/collect')
				get('/my/article/getSelf').then(res=>{
					this.articleLength = res.data.data.length
					this.$store.commit('articleAbout/CHANGE',this.articleLength)
				},err=>{
					console.log(err)
				}),
				//
			post('/my/comment/collectOwn').then(res=>{
				this.Clength = res.data.data.length-0
				this.$store.commit('collectAbout/CHANGE',this.Clength)
			},err=>{
				console.log(err)
			})
			//
			//
			this.hour =new Date().getHours()
			}
	}
</script>

<style lang="scss" scoprd>
	.bigbox{
		height: 100%;
		background-color: var(--bcolor) !important;
	}
.user_img{
	height: 50rpx;
	width: 50rpx;
}
.img{
	width: 100%;
	height: 380rpx;
}

.user{
	margin: 0 0 5rpx 0;
	height: 120rpx;
	line-height: 120rpx;
	padding: 0 50px;
	width: 100%;
	position: relative;
	.userimg{
		background-color: white;
		border: 1px solid white;
		box-shadow: 0 0 5px 2rpx #55007f;
		position: absolute;
		width: 160rpx;
		height: 160rpx;
		left: 30rpx;
		top: -70rpx;
		border-radius: 80rpx;
	}
	.userword{
		height: 30rpx;
		line-height: 30rpx;
		position: absolute;
		font-size: 20rpx;
		left: 220rpx;
		top:30rpx;
	}
	.userimgD{
		position: absolute;
		right: 70rpx;
		top: 10rpx;
		width: 50rpx;
		height: 50rpx;
		font-size: 30rpx;
		color: #ffcc00;
	}
	image{
	position: absolute;
	right: 120rpx;
	top: 40rpx;
	width: 50rpx;
	height: 50rpx;
	
	}
	.usericon{
		position: absolute;
		right: 10rpx;
	}
}
//
.nav{
	width: 100%;
	height: 120rpx;
	display: flex;
	flex-direction: row;
	border-bottom: 2rpx solid #cdcdff;
	view{
		display: flex;
		flex-direction: column;
		width: 250rpx;
		text-align: center;
		height: 80rpx;
		view{
			font-size: 26rpx;
			height: 40rpx;
			line-height: 40rpx;
		}
	}
	.middleNav{
		border-left:  2rpx solid blue;
		border-right:  2rpx solid blue;
	}
}
.cards{
	border-bottom: 1px solid #b6b6b6;
	height: 100rpx;
	line-height: 100rpx;
	width: 100%;
	padding-right: 50rpx;
	margin: 10rpx 0 ;
	border-radius: 10rpx;
	// box-shadow: 0 1rpx 2rpx 6rpx #fcf5ff;
	text{
		padding-left: 50rpx;
	}
}
</style>
