<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
				this.$store.dispatch('artcateAbout/getcate')
		},
		onShow: function() {
			console.log('App Show')
			if(uni.getStorageSync('token')) this.$store.dispatch('userinfoAbout/getuser')	
				
		
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		// background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	page {
		// background-color: #f3f3f3;
		height: 100%;
		// background-color: var(--bcolor) !important;
	}
	.container{
		height: 100%;
		background-color: var(--bcolor) !important;
	}
	body,view,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,text,p,blockquote,th,td { margin:0; padding:0; color:var(--fcolor);}//color:var(--bcolor)
	body { background:#fff; color:#555; font-size:14px; font-family: Verdana, Arial, Helvetica, sans-serif; }
	td,th,caption { font-size:14px; }
	h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; }
	address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;}
	a { color:#555; text-decoration:none; }
	a:hover { text-decoration:none; }
	img { border:none; }
	ol,ul,li { list-style:none; }
	input, textarea, select, button { font:14px Verdana,Helvetica,Arial,sans-serif; }
	table { border-collapse:collapse; }
	html {overflow-y: scroll;} 
	.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
	view{box-sizing: border-box;}
</style>
