<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="更新用户信息" >
			<text class='title'>username : </text> <input type="text"  v-model.trim="updateusername" /><br/>
			<text class='title'>nickname : </text> <input type="text"  v-model.trim="updatenickname" /><br/>
			<text class='title'>email : </text> <input type="text"        v-model="upadteemail" /><br/>
			<button :disabled='!cansub' @click="sub" >update</button><text style="color:red">{{updatemessage}}</text>
			</uni-collapse-item>
			<!-- <uni-collapse-item title="上传头像" ><UserPicture></UserPicture></uni-collapse-item> -->
			<UserPicture></UserPicture>
		</uni-collapse>
					
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:"centerUpdataUserinfo",
		data() {
			return {
				    updateusername:'',
				    updatenickname:'',
				    upadteemail:'',
					data: "",
					picPath:'',
			};
		},
		 methods: {
		        sub(){
		            this.$store.commit('userinfoAbout/UPDATEMESSAGE','loading...')
		            const info = { username:'',nickname:'',email:''}
		            info.username = this.updateusername ? this.updateusername : this.username
		            info.nickname = this.updatenickname ? this.updatenickname : this.nickname
		            info.email    = this.upadteemail ? this.upadteemail : this.email
		            this.$store.dispatch('userinfoAbout/updateuser',info)
		            this.cls()
		        },
		        cls(){
		            this.updateusername = ''
		            this.updatenickname = ''
		            this.upadteemail    = ''
		        },
		    },
			computed:{
			        ...mapState('userinfoAbout',['username','nickname','email','user_pic','updatemessage']),
			        cansub(){
			            return this.updateusername || this.updatenickname || this.upadteemail
			        }
			    },
				mounted(){
					}
	}
</script>

<style lang="scss">
	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
		color: #333;
	}
</style>
</style>






