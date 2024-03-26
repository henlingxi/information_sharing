import store from './store/index'
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import {router,RouterMount} from './router/router.js'  //路径换成自己的
Vue.use(router)

Vue.config.productionTip = false
// Vue.prototype.redirectTo({	url:"../login/login?backpage="+backpage+"&backtype="+backtype})
//全局事件处理函数
Vue.prototype.SHOWTIME = function(time,flag=0){
						time = time -0
 						let date = new Date(time);
 						let Y = date.getFullYear() + '-';
 						let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
 						let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
 						let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
 						let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
 						let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
						let SYMPLE = Y + M + D
 						let ALL = Y + M + D + h + m + s;
						if(flag === 1)return ALL
 					return SYMPLE
 			}
			Vue.prototype.$SwitchDorN = function() {
							let IsDark = uni.getStorageSync('IsDark');
							if(IsDark == false){
								this.bcolor = 'white'
								this.fcolor = "black"
							}else if(IsDark == true) {
								this.bcolor = '#1b1b1b'
								this.fcolor = '#d4d4d4'
								}
							if(IsDark == false) {
								uni.setTabBarStyle({
									color: '#7e858f',
									selectedColor: '#76C8F9',
									backgroundColor: '#ffffff',
									borderStyle: 'black'
								})
								}
							else if(IsDark == true) {
								// 关于tabBar的深色模式修改
								uni.setNavigationBarColor({
									frontColor: '#312736',
									backgroundColor: '#312736'
								})
								// // 关于导航栏的深色模式修改
								uni.setTabBarStyle({
									color: '#7e858f',
									selectedColor: '#76C8F9',
									backgroundColor: '#312736',
									borderStyle: 'black'
								})
							}
						}
import { pathToBase64, base64ToPath } from 'image-tools'
// Vue.prototype.CHANGE = function(base64){
// 	this. t 
// 	base64ToPath(base64) //base64:
// 	  .then(path => {
// 		  // console.log(path)
// 		// path
// 		this.t = path
// 		// console.log(path)
// 	  })
// 	  .catch(error => {
// 	    console.error(error)
// 	  })
// 	  return '111'
// }			
			
Vue.prototype.baseUrl = 'http://127.0.0.1:3007'

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif