/**
 * 在app中运行时候隐藏顶部导航栏
 */

export default (pages) => {
  return {
    onShow() {
      if (showChangWh(getCurrentPage(pages))) {
        this.topBarMixin_showTopBar()
      } else {
        this.topBarMixin_hideTopBar()
      }
    },
    mounted() {
      if (this.$store.getters.isAppStart) {
        this._hideTopBar()
      }
    },
    onNavigationBarButtonTap(e) {
      if (this.$refs.selectWarehouse) {
        this.$refs.selectWarehouse.show()
      }
    },
    methods: {
      // 隐藏顶部标题栏
      _hideTopBar() {
        const headerBar = document.getElementsByTagName('uni-page-head')[0]
        const pageWrapper = document.getElementsByTagName('uni-page-wrapper')[0]
        headerBar && (headerBar.style.display = 'none')
        setTimeout(() => {
          pageWrapper.style.height = '100%'
        }, 0)
      },
      // 显示顶部标题栏，并注册点击事件
      topBarMixin_showTopBar() {
        UniService.subscribe('showChangeWh')
        window.onNavigationBarButtonTap = this._navigationBarButtonTap
      },
      // 隐藏顶部切换仓库三个点
      topBarMixin_hideTopBar() {
        UniService.subscribe('hideChangeWh')
        window.onNavigationBarButtonTap = () => {}
      },
      // 顶部标题栏点击事件
      _navigationBarButtonTap(e) {
        this.showWarehouse = true
        this.focusMain = false
        this.focusKeyPart = false
        if (this.$refs.selectWarehouse) {
          this.$refs.selectWarehouse.show()
        }
      }
    }
  }
}
/**
 * 获取当前页面的配置信息
 * @param {pages.json中配置的页面信息} pages
 */
function getCurrentPage(pages) {
  const pathname = window.location.pathname
  return pages.find((x) => pathname.includes(x.path))
}
/**
 * 当前页面是否需要显示顶部topbar切换仓库按钮
 * @param {当前页面配置信息} page
 */
function showChangWh(page) {
  return page?.style?.h5?.titleNView?.buttons[0]?.text == '\ue64e'
}
