/**
 * @description  用于各个功能中,光标聚焦到指定input上
 * 用法如下:
 * <input  :focus="foucsIndex == 1" />
 * 调用  $toFoucs(1) 光标即可聚焦到该input上		 
 * @author bing
 * @date 2023-08-04 15:58
 */
export default {
	data() {
		return {
			foucsIndex: 0,
		}
	},
	methods: {
		/**
		 * @description  定位光标到指定input框
		 * @author bing
		 * @date 2023-08-04 17:16
		 * @param {Number} to  要定位到的input,
		 * @param {Function} callback  定位之后的回调
		 * @param {boolean} hideKeyboard  是否关闭软键盘,默认关闭
		 */
		$toFoucs(to, hideKeyboard = true, callback, ) {
			this.foucsIndex = 9999;
			this.$nextTick(() => {
				this.foucsIndex = to;
				hideKeyboard ? this.$hideKeyboard() : ""
				callback ? callback() : ''
			})
		},
		// 关闭软键盘,防冻
		$hideKeyboard() {
			var interval = setInterval(function() {
				uni.hideKeyboard(); //隐藏软键盘
			}, 10);
			setTimeout(() => {
				clearInterval(interval);
			}, 1000);
		}
	}

}