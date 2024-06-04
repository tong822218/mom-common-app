export default {
	show:(config = {}) =>{
		
		let defaultCon = {
			title:config.title || '加载中...',
			mask:config.mask || true, // 是否显示透明蒙层，防止触摸穿透，默认：true
		}
		
		 uni.showLoading(defaultCon);
		   
		
	},
	hiden:() => {
		 uni.hideLoading()
	}
}