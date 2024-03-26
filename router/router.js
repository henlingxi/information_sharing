import { RouterMount, createRouter } from 'uni-simple-router';
 
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
//权限控制登录
	if(to.meta.auth){
		// console.log("需要登录");
		let token = uni.getStorageSync("token")
		// console.log(token)
		if(token){
			next();
		}else{
			
			uni.redirectTo({
				url: '/pages/login/login'
			});
		}
	}else{
		// console.log("不需要登录");
         next();
	}
	
	// console.log("前置守卫"+JSON.stringify(to));
	
});
router.afterEach((to, from) => {
	// console.log('跳转结束')
})
 
export {
	router,
	RouterMount
}