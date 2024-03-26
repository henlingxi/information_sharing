 <template>
 	<view>
		<uni-card title="状态"> <view>{{artState}}</view><button @click="trunState">状态切换</button></uni-card>
		<view v-show="!flag">
			<uni-section title="标题"  type="line" padding>
						<uni-easyinput  type="textarea" autoHeight v-model="newTitle"></uni-easyinput>
			</uni-section>
			<uni-section title="文章内容" type="line" padding>
						<uni-easyinput  type="textarea" autoHeight v-model="newContent"></uni-easyinput>
			</uni-section>
			<uni-section title="分类" type="line" padding>
						<view v-if="presentState">当前:{{presentState.name}}</view>
						<label for="">请选择文章类型：</label>
						<select name="" class="setState" v-model.number="newcate_id">
							<template v-for="item of artCate">
								<option  :key="item.id" :value="item.id">{{item.name}}</option>
							</template>
						</select>
			</uni-section>
		</view>
		<view v-show="flag">
			<uni-card title="标题">	<view>{{newTitle}} </view> </uni-card>
			<uni-card title="文章内容">	<view>{{newContent}} </view> </uni-card>
			<uni-card title="分类" v-if="presentState">		<view>	{{presentState.name}}		</view></uni-card>
		</view>
		<uni-card><button :disabled="flag" @click="subEdit" style="text-align: center;color: blue;" >提交修改</button><view style="color: red;text-align: center;">{{message}}</view></uni-card>
		<uni-card title="作者">		<view>	{{authorInfo.nickname}}	</view></uni-card>
		<uni-card title="发布时间">	<view>	{{showTime}}			</view></uni-card>
 		</uni-card>
 	</view>
 </template>
 
 <script>
	 import {post} from '../../utils/request.js'
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
 	import {get} from "../../utils/request.js"
 	export default {
 		data() {
 			return {
 				// id cate_id title content time author_id picture isdelete state
 				article:{},
 				// id username nickname email user_pic state 
 				authorInfo:{},
				// id alias name isdelete
				artCate:[],
				artState:'',
				newCate:'',
				newTitle:'',
				newContent:'',
				newcate_id:'',
				flag:true,
				presentState:{},
				
				message:''
 			};
 		},
		
		methods:{
			subEdit(){
				// newTitle  newContent  newCate
				//  /my/article/Change
			
				const cate = this.newcate_id ? this.newcate_id : this.presentState.id
				post('/my/article/Change',{id:this.article.id, title:this.newTitle,content:this.newContent,cate_id:cate}).then(res=>{this.message = res.data.message},err=>{console.log(err)})
			},
			trunState(){
				const id = (this.article.id)-0
				if(this.artState === 'pubilshed'){
					
					post('/my/article/stateChange',{set:'sketch',id:id}).then(res=>{
																console.log(res.data);this.artState ='sketch' ; this.flag = false
																},err=>{console.log(err)})
				}
				else if(this.artState ==='sketch'){
					 post('/my/article/stateChange',{set:'pubilshed',id:id}).then(res=>{
																console.log(res.data);this.artState ='pubilshed' ; this.flag = true
															    },err=>{console.log(err)})
				}
			
				else console.log('状态改变出错')
			}
		},
	
 		computed:{
 			showTime(){
					if( this.article.time){
						let t = this.article.time
						return this.SHOWTIME(t,1)
					}
					else return 'no serve'
 			},
 		},
 		onShow() {
		    // 获取当前小程序的页面栈
		    let pages = getCurrentPages();
		    // 数组中索引最大的页面--当前页面
		    let currentPage = pages[pages.length-1];
		    // 打印出当前页面中的 options
		    // console.log(currentPage.options['id'])
			let getId = currentPage.options['id']
			get('/api/article/getByid',{id:getId}).then(res=>{ 
				this.article = res.data.data[0]
				this.newTitle =  res.data.data[0].title
				this.newContent =  res.data.data[0].content
				this.artState = res.data.data[0].state
				if(res.data.data[0].state === 'sketch'){ this.flag = false}
				if(res.data.data[0].state === 'pubilshed'){ this.flag = true}
				// this.flag = res.data.data[0].state
				if(this.artCate){
					const filCate = this.artCate.filter((cate)=>{
								if(cate.id === this.article.cate_id)return cate
							})
							this.presentState = filCate[0]
				}
				},err=>{ console.log(err)})
			get('/api/cates').then(res=>{
				this.artCate = res.data.data.results
				if(this.article){
					const filCate = this.artCate.filter((cate)=>{
								if(cate.id === this.article.cate_id)return cate
							})
							this.presentState = filCate[0]
				}
				},err=>{console.log(err)})
			get('/my/userinfo').then(res=>{
				this.authorInfo = res.data.data
			    },err=>{console.log(err);alert(err.message)}) 
 		}
		
 	}
 </script>
 
 <style lang="scss">
 	.article{
 		min-height: 500rpx;
 	}
	.setState{
		width: 200rpx;
	}
 </style>
 