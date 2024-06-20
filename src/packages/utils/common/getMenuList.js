// 获取资源
export function getMenuList(store) {
  UniService.subscribe("getMenuList", {
    success: (data) => {
      console.log("包内getMenuList menuList")
      uni.setStorageSync("menuList",data);
    },
    fail: (e) => {
     
    },
    
    //等待 后续传入当前页路由信息，去基座获取barTitle
    // params
  });
}
