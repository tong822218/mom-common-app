const getters = {
  token: (state) => state.user.token,
  baseUrl: (state) => state.user.baseUrl,
  userInfo: (state) => state.user.userInfo,
  operatorInfo: (state) => state.user.operatorInfo,
  operatorCode: (state) => {
    return state.user.operatorInfo.userCode || state.user.userInfo.jobNumber
  },
  menus: (state) => state.user.menus,
  factory: (state) => state.user.factory,
  language: (state) => state.language.language,
  wmsSummary_orderTypeData: (state) => state.wmsSummaryInStorage.orderTypeData,
  wmsSummary_warehouseData: (state) => state.wmsSummaryInStorage.warehouseData,
  modeling: (state) => state.user.modeling,
  orderType: (state) => state.user.orderType,
  isAppStart: (state) => state.user.isAppStart
}
export default getters
