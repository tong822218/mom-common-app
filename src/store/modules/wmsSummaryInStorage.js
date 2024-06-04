//汇总入库的仓库，跟入库类型缓存
const wmsSummaryInStorage = {
    state: {
        //    入库类型
        orderTypeData: {
            // orderType: null,
            // orderTypeName: null,
        },
        //仓库
        warehouseData: {
            // warehouseCode: null,
            // warehouseName: null,
        },
    },
    mutations: {
        //设置入库类型
        set_wmsSummary_orderTypeData: (state, result = {}) => {
            state.orderTypeData = result;
        },
        //设置仓库
        set_wmsSummary_warehouseData: (state, result = {}) => {
            state.warehouseData = result;
        },
    },
};

export default wmsSummaryInStorage;
