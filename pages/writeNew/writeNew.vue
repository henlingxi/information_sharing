<template>
	<view>
		<uni-section title="文章标题" subTitle="好耶" type="line" padding>
					<text class="uni-subtitle">输入内容：{{ '"'+title+'"' }}</text>
					<uni-easyinput class="uni-mt-5" trim="all" v-model="title" placeholder="请输入标题"></uni-easyinput>
		</uni-section>
		<uni-section title="文章内容" subTitle="好耶" type="line" padding>
					<uni-easyinput type="textarea" autoHeight v-model="content" placeholder="请输入内容"></uni-easyinput>
		</uni-section>
		                <label for="">储存为：</label>
		                <select name="" class="setState" v-model="state">
							<option value="">--请选择--</option>
		                    <option value="pubilshed">发布</option>
		                    <option value="sketch">草稿</option>
		                </select>
						<label for="">请选择文章类型：</label>
						<select name="" class="setState" v-model.number="cate_id ">
							<template v-for="item of cateArray">
								<option  :key="item.id" :value="item.id">{{item.name}}</option>
							</template>
						</select>
		<br/>
		<!-- {{cateArray}} -->
		<button @click="subArt" >提交</button>
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
				cateArray:[]
			};
		},
		methods:{
			subArt(){
				 this.cate_id= Number(this.cate_id)
				console.log(this.cate_id)
				post('/my/article/add',{title : this.title, content : this.content,state :this.state, cate_id:Number(this.cate_id)
				}).then(res=>{
					console.log(res.data)
				},err=>{ console.log(err)})
			}
		},
		mounted(){
			get('/api/cates').then(res=>{this.cateArray = res.data.data.results},err=>{console.log(err)})
		}
	}
</script>

<style lang="scss">
	.setState{
		width: 200rpx;
	}
</style>
