/**
 * @author bing
 * @since 2023-12-18 16:53:08
 *   国际化相关, 根据选择的语言,修改页面的title
 */
import { loadLanguageAsync } from "@/lang/i18n-setup";
export default {
  data() {
    return {
      menuListFlat: [],
    };
  },
  methods: {
    // 数据展平
    $formatAppMenu() {
      let data = uni.getStorageSync("menuList") || [];
      let res = [];
      data.forEach((item) => {
        const list = [];
        recursion(item, list);
        item.children = list;
        res = [...res, ...list];
      });
      function recursion(obj, list) {
        if (obj.children) {
          obj.children.forEach((item) => {
            item.status = 1;
            recursion(item, list);
          });
        } else {
          list.push(obj);
        }
      }
      return res;
    },
    // 设置title
    $setTitle() {
      // 获取当前路由地址
      let { route, options, language } = this.$getRoute();
      // 基座传入当前语言，同步当前工程
      if (language) {
        const currentLang = this.$store.getters.language;
        if (lang == currentLang) return;
        this.$store.commit("SET_LANGUAGE", lang);
        loadLanguageAsync();
      }
      
      // if (options.barTitle) {
      //   uni.setNavigationBarTitle({ title:barTitle });
      // }
      // 便利数据展平
      if (this.menuListFlat.length == 0) {
        menuList = this.$formatAppMenu();
        this.menuListFlat = menuList;
      }
      let menuList = this.menuListFlat;
      //当前页面,菜单管理配置的信息
      let pageItem = null;
      for (var i = menuList.length; i--; ) {
        if (menuList[i].path==location.pathname) {
          // 查找配置的中英文
          pageItem = menuList[i];
          break;
        }
      }
      // 查找缓存是否有值,没有,用默认配置pages.json
      if (pageItem) {
        let key =
          this.$store.getters.language == "en"
            ? "englishResourceName"
            : "label";
        let title = pageItem[key];
        if (title) {
          // 设置title
          uni.setNavigationBarTitle({ title });
        }
      }
    },
    // 获取路由信息  go: 默认1,当前页面路由信息   2 上一页,依此类推
    $getRoute(go = 1) {
      try {
        const pages = getCurrentPages();
        const currentRoute = pages[pages.length - go];
        return currentRoute;
      } catch (error) {
        console.error("获取路由信息报错", error);
        return {};
      }
    },
  },
  onReady() {
    this.$setTitle();
  },
};
