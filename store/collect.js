import {get,post} from '../utils/request'

export default {
	
     namespaced:true,
        actions: {
			collect(context){
			    get('/my/comment/collectOwn').then(
			        res=>{
			              const value = res.data.data
			              context.commit('CHANGE',value)
			            },
			        err=>{console.log(err);alert(err.message)}
			    ) 
			}
        },
        mutations: {
			CHANGE(store,value){
				
				store.collectSum += value
				// console.log(store.collectSum)
			},
			REMOVE(store){
				store.collectSum = 0
			}
        },
        state: {
		//	/my/comment/collectOwn
		collectSum:0
        },
        getters: {
        },
}