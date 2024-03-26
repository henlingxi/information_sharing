 <template>
 	<view>
		<view class='title'><img src="../../static/be4961907f5d513f6c49c2e382f65de.png"><view>创作</view></view>
		<!--  -->
		<input type="text" class="inputTitle" v-model.trim="title" placeholder="请输入标题" >
 		
		<uni-easyinput class="textArea" type="textarea" autoHeight v-model="content" placeholder="请输入内容"></uni-easyinput>
			
			
			<view class="textLength">字数 : {{TextNumber}}</view>
 		              <view class="state">
						  <text>储存为:</text>
						  <select name="" class="setState" v-model="state">
						  	<option value="">--请选择--</option>
						      <option value="pubilshed">发布</option>
						      <option value="sketch">草稿</option>
						  </select>
					  </view>
					  
					   <view class="state">
						   <text >文章类型:</text>
						   <select name="" class="setState" v-model.number="cate_id ">
						   	<template v-for="item of cateArray">
						   		<option  :key="item.id" :value="item.id">{{item.name}}</option>
						   	</template>
						   </select>
					   </view>
					   <view style="text-align: center; color: red;" >{{message}}</view>
 		<button class="sub" :disabled="!canSub" @click="subArt">提交</button>
 	</view>
 </template>
  <!-- post /my/article/add   title , cate_id , content , state"published","sketch" -->
 <script>
 	import {get ,post} from '../../utils/request.js'
 	export default {
 		data() {
 			return {
 				title:'',
 				content:'',
 				state:'',
 				cate_id:0,
 				cateArray:[],
				//
				message:''
 			};
 		},
 		methods:{
 			subArt(){
				this.message = 'Loading...'
 				 this.cate_id= Number(this.cate_id)
 				post('/my/article/add',{title : this.title, content : this.content,state :this.state, cate_id:Number(this.cate_id)
 				}).then(res=>{
					//vuex
 					if(!res.data.status){
						this.$store.commit('articleAbout/CHANGE',1)
						this.clear()
						
					}
 					this.message = res.data.message
 				},err=>{ console.log(err)})
 			},
			clear(){
				this.title ='' 
				this.content ='' 
				this.state =''
				this.cate_id =''
			}
 		},
		computed:{		
			canSub(){
				return this.title && this.content && this.state && this.cate_id
			},
			TextNumber(){
				return  this.content.length
			}
		},
		// 组件开始加载   后端获取文章分类
 		mounted(){
 			get('/api/cates').then(res=>{this.cateArray = res.data.data.results},err=>{console.log(err)})
 		},
		
 	}
 </script>
 
 <style lang="scss">
	 .title{
		 padding: 40rpx;
		 border-bottom: 1rpx solid gray;
		 img{
		 	width: 80rpx;
		 	vertical-align: middle;
		 }
		 view{
		 	font-size: 25px;
		 	display: inline-block;
		 }
	 }
	 .inputTitle{
		 height: 100rpx;
		 font-size:30rpx ;
		 margin: 60rpx;
		 border-bottom: 2rpx dashed #aaaaff;
	 }
	 .textArea{
		 width: 650rpx;
		 margin: 50rpx;
		 min-height: 200rpx;
	 }
	 .state{
		 margin: 60rpx;
		 height: 60rpx;
		 line-height: 60rpx;
		 padding: 10rpx;
		 text{
			 display: inline-block;
			 width: 160rpx;
		 }
		 .setState{
			 width: 200rpx;
		 }
	 }
	.textLength{
		margin: 0rpx 60rpx 30rpx 60rpx;
		text-align: right;
		font-size: 16px;
		color: #aaaaff;
	}
	.sub{
		text-align: center;
		background-color: #fff;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 20px;
		margin: 0 60rpx ;
		border-radius: 30rpx;
		color: #aaaaff;
		box-shadow: 0 1rpx 2rpx 2rpx #aaaaff;
	}
 </style>