import {get,post} from '../utils/request'

export default {
     namespaced:true,
        actions: {
            getuser(context){
                get('/my/userinfo').then(
                    res=>{
                          const value = res.data.data
                          context.commit('GETUSER',value)
                        },
                    err=>{console.log(err);alert(err.message)}
                ) 
            },
            updateuser(context,value){
                post('my/updateinfo',value).then(
                    res=>{
                        if(res.data.status === 0){
                            const val = res.data.message
                            context.commit('UPDATEMESSAGE',val)
                            context.commit('UPDATEUSER',value)
                        }
                        const val = res.data.message
                        context.commit('UPDATEMESSAGE',val)
                    },err=>{
                        const val = err.messgae
                        context.commit('UPDATEMESSAGE',val)
                    }
                )
            }
        },
        mutations: {
            GETUSER(store,value){
                store.userinfo = value
                store.username = value['username']
                store.nickname = value['nickname']
                store.email    = value['email']
                store.user_pic = value['user_pic']
            },
            UPDATEUSER(store,value){
                const {username,nickname,email} = value
                store.username=username
                store.nickname=nickname
                store.email=email
            },
            UPDATEMESSAGE(store,value){
                store.updatemessage=value
            },
			REMOVEUSER(store,value){
				store.username = ''
				store.nickname = ''
				store.email    = ''
				store.user_pic = ''
			}
        },
        state: {
            userinfo:{},
            username:'',
            nickname:'',
            email:'',
            user_pic:'',
            updatemessage:''
        },
        getters: {
        },
}