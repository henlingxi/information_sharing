import axios from 'axios'

const myAxios = axios.create({
    // baseURL:'http://127.0.0.1:3007',
	baseURL:'http://d7d131c.r8.vip.cpolar.cn',

    timeout:5000,
    headers:{
        "Content-Type": "application/json;charset=utf-8"
    }
})
//请求拦截
myAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    if(token) config.headers.Authorization =token // 不为空的话就设置进headers
  
    return config
},err=>Promise.reject(err))

//响应拦截
myAxios.interceptors.response.use(response=>{
    
    return response
},err=>Promise.reject(err))

//方法封装
export function get(url,params){
    return myAxios.get(url,{params})
}

export function post(url,data){
    return myAxios.post(url,data)
}

export function del(url){
    return myAxios.del(url)
}

export function put(url,data){
    return myAxios.put(url,data)
}
