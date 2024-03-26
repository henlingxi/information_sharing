<template>
	<view>
		<view class="title">
			{{title}}
		</view>
			
			<view v-if="islogin">
				<uni-section title="用户名" type="line" padding>
							<uni-easyinput trim="all" v-model="username" placeholder="请输入用户名"></uni-easyinput>
				</uni-section>
				<uni-section title="密码"  type="line" padding>
					<uni-easyinput type="password" v-model="password" placeholder="请输入密码"></uni-easyinput>
				</uni-section>
				<view class="submit">	<button @click="loginSub" :disabled="!loginCanSubmit">登录</button> <view>{{loading?"loading":""}} {{message}}</view></view>
			
			</view>
			
			<view v-if="!islogin">
				<uni-section title="用户名" type="line" padding>
							<uni-easyinput trim="all" v-model="username" placeholder="请输入用户名"></uni-easyinput>
				</uni-section>
				<uni-section title="密码"  type="line" padding>
					<uni-easyinput type="password" v-model="password" placeholder="请输入 4-12 位密码"></uni-easyinput>
				</uni-section>
				<uni-section title="密码"  type="line" padding>
					<uni-easyinput type="password" v-model="rePassword" placeholder="请再次输入密码"></uni-easyinput>
				</uni-section>
						<view class="submit"><button  @click="reguserSub" :disabled="!reguserCanSubmit">注册</button> <view>{{loading?"loading":""}} {{message}} {{passwordMessage}}</view></view>
			</view>
			<view class="bottom">
				<button  @click="changeBtn">切换至{{change}}</button>
				<button class="second" @click="closeLogin">取消登录</button>
			</view>
	</view>
	
</template>

<script>
	import {post} from "../../utils/request.js"

	export default {
		data() {
			return {
				username:'',
				password:'',
				rePassword:'',
				message:'',
				passwordMessage:'',
				successPath:'',
				islogin:true,
				loading:false

			};
		},
		methods:{
			loginSub(){
				this.loading=true
				 post(
						'/api/login',{ username:this.username , password:this.password }
					).then(res=>{
						this.loading=false
						this.remove
						this.message=res.data.message
						if(res.data.token !== undefined){
							uni.setStorageSync('token',res.data.token)
							this.$store.dispatch('userinfoAbout/getuser')
							if(this.successPath.p) uni.redirectTo({url:this.successPath.p})	//传参选择路由跳转地址
							else uni.switchTab({url: '/pages/center/center'});
							}
							
							else uni.removeStorageSync('token')
						},err=>{
							this.loading=false
							this.remove
							this.message=err.message
							uni.removeStorageSync('token')
							})
			},
			reguserSub(){
				this.loading=true
				 post(
						'/api/reguser',{ username:this.username , password:this.password }
					).then(res=>{
						this.remove
						this.loading=false
						this.message = res.data.message
						setTimeout(()=>{	if(this.islogin=false){this.islogin=!this.islogin}},2000)
						},err=>{ this.loading=false
								this.remove
								this.message=err.message
								})
			},
			closeLogin(){this.$Router.push({path:"/pages/home/home"})},
			changeBtn(){
				this.islogin = !this.islogin
			},
			remove(){this.username ='',this.password='',this.rePassword=''}
		},
		computed:{
			title(){	return this.islogin?"登录":"注册"	},
			change(){	return this.islogin?"注册":"登录"	},
			loginCanSubmit(){    return this.username && this.password && this.loading === false },
			reguserCanSubmit(){if(this.password !== this.rePassword && this.password !== '' && this.rePassword !=='')this.passwordMessage='两次密码不同'
							else this.passwordMessage=''
			            return this.username && this.password && this.password === this.rePassword && this.loading === false		}
		},
		onLoad(p){
			this.successPath=p
		}
	}
</script>

<style lang="scss">
	.title{
		rpxth:750rpx ;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		font-size: 24px;
	}
	
	.submit{
		width: 550rpx;
		margin: 50rpx 100rpx;
		button{
			height: 80rpx;
			line-height: 80rpx;
			box-shadow: 0 1rpx 10rpx 4rpx lightgray;
		}
		view{
			text-align: center;
			margin:20rpx;
			height: 40rpx;
		}
	}
	.bottom{
		width: 650rpx;
		margin: 50rpx;
		button{
			display: inline-block;
			background-color: transparent;
			color: #595959;
		}
		.second{
			float: right;
		}
	}
</style>
