<template>
	<view>
		<uni-section title="">
			<view class="example-body " @click="ChangePhoto">
				<!-- <uni-file-picker readonly :value="fileLists" :imageStyles="imageStyles" file-mediatype="image">
				</uni-file-picker> -->
				<image :src="url"></image>
				{{message}}
			</view>
		</uni-section>
		
		
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from 'image-tools'
	import {get,post} from '../../utils/request.js'
		export default {
		name:"UserPicture",
		data() {
			return {
				message:'',
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						radius: '50%'
					}
							},
				// fileLists: [{
				// 	url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao-small.jpg',
				// 		extname: 'png',
				// 		name: 'shuijiao.png'
				// 	}]
				url:"",
				Base:''
			};
		},
		methods:{
			ChangePhoto(){
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// console.log(typeof res.tempFilePaths[0]);
						// that.fileLists[0].url = res.tempFilePaths[0]
						that.url = res.tempFilePaths[0]
						pathToBase64(res.tempFilePaths[0])
						  .then(base64 => {
							  console.log(base64)
							base64ToPath(base64) //base64:
							  .then(path => {
								post('/my/update/avatar',{avatar:path}).then(res=>{
																this.message = res.data
																console.log(res.data)
																// this.url = this.CHANGE(base64)
															},err=>{
																console.log(err)
															})
								})
								.catch(error => {
								  console.error(error)
								})
								  // console.log(path ===res.tempFilePaths[0])
							  })
							  .catch(error => {
							    console.error(error)
							  })
							
							  
							  
						
					}
				});
			},
		},
		mounted(){
			let that = this
			get('/my/userinfo').then(res=>{
				const b = res.data.data.user_pic
				console.log(b)
				
				// this.url = this.CHANGE(b)
				// base64ToPath(b) //base64:
				//   .then(path => {
					  
				// 	that.url = path
				// 	console.log(path)
				//   })
				//   .catch(error => {
				//     console.error(error)
				//   })
			})
			
			
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

