import {get,post} from '../utils/request'

export default {
     namespaced:true,
        actions: {
        },
        mutations: {
			//查看编辑自己文章传参
			OWNARTICLEEDIT(store,value){
				store.ownArticle = value
			},
			CHANGE(store,value){
				store.ownArticleSum += value
			},
			REMOVE(store,value){
				store.ownArticleSum = 0
			}
        },
        state: {
			// 查看页面文章参数
			ownArticle:{},
			ownArticleSum:0
        },
        getters: {
        },
}