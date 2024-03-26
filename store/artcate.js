import {get,post} from '../utils/request'

export default {
     namespaced:true,
        actions: {
			getcate(context){
				get('/api/cates').then(res=>{
					const value = res.data.data.results
					context.commit('GETCATE',value)
					},err=>{console.log(err)})
			}
        },
        mutations: {
			GETCATE(store,value){
				store.artcate=value
			}
        },
        state: {
			// 查看页面文章参数
			artcate:[]
        },
        getters: {
        },
}