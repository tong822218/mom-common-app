/**
 * 刷新页面缓存住vuex内容
 */
export default (store) => {
	//在页面刷新时将vuex里的信息保存到Storage里
	window.addEventListener("beforeunload", () => {
		uni.setStorageSync("vuexInfo", JSON.stringify(store.state));
	});

	//在页面加载时读取Storage里的状态信息
	if (uni.getStorageSync("vuexInfo")) {
		Object.assign(
			store.state,
			JSON.parse(uni.getStorageSync("vuexInfo"))
		);
		//使用后清除内存
		setTimeout(function() {
			uni.removeStorageSync("vuexInfo");
		}, 300);
	}
}