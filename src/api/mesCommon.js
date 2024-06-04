const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl, adminUrl } = baseUrl();
import app from "@/main";
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
// 获取当前人员默认信息
export const getUserExtendInfo = (data) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesUserExtend/getListByCode`,
    // url: `http://localhost:10100/mes-service/mesUserExtend/getListbyCode`,
    data,
  });
};

//获取工厂列表
export const getFactoryList = () => {
  //   return http.request({
  //     method: "GET",
  //     url: `${adminUrl}baseFactoryModeling/select?level=3`,
  //   });
  return new Promise((resolve, reject) => {
    let { factoryCode, factoryName } = app.$store.getters.factory;
    resolve({
      code: 0,
      data: {
        result: [
          {
            modelingCode: factoryCode,
            factoryName: factoryName,
          },
        ],
      },
    });
  });
};

//获取工厂获取产业信息
export const getParent = (modelingCode) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}baseFactoryModeling/parent?modelingCode=${modelingCode}`,
  });
};

//获取工作日期
export const getWorkDate = (factoryCode) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesCommon/getWorkDate/${factoryCode}`,
  });
};

//获取线体下拉
export const getLineList = (factoryCode) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}baseFactoryModeling/children?modelingCode=${factoryCode}&level=5`,
  });
};
//获取班次下拉
export const getShiftList = (factoryCode) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesShift/list?factoryCode=${factoryCode}`,
  });
};
//获取班组下拉
export const getTeamList = (factoryCode) => {
  console.log("111=", factoryCode);
  return http.request({
    method: "GET",
    url: `${mesUrl}mesTeam/list?factoryCode=${factoryCode}`,
  });
};
//根据工厂、线体获取班组下拉
export const getTeamListByLine = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesTeam/list`,
    params,
  });
};
//获取工位下拉
// export const getLocationList = (lineCode) => {
//     return http.request({
//         method: 'GET',
//         url: `${adminUrl}baseFactoryModeling/children?modelingCode=${lineCode}&level=6`,
//     });
// };
//根据线体获取工位下拉
export const getLocationByLine = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}baseFactoryModeling/children`,
    params,
  });
};

//根据产业获取缺陷部位下拉
export const getDefectLocationList = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}mesDefectLocation/list`,
    params,
  });
};
//根据缺陷部位获取故障现象下拉
export const getDefectPhenomenonList = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}mesDefectPhenomenon/getPhenomenonByLocation`,
    params,
  });
};
//获取返修工序下拉
export const getRepairProcessList = (factoryCode) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesProcess/list?factoryCode=${factoryCode}&processProperty=repair`,
  });
};

// 获取工序工位关联关系-包含工序属性
export const getProcessCellList = (data) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesProcessCell/getList`,
    data,
  });
};
//获取线体下拉
export const getAllLines = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}baseFactoryModeling/select?level=5`,
    params,
  });
};
export const getAllLineschildren = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}baseFactoryModeling/children?level=5`,
    params,
  });
};
//查询不良代码库列表
export const getFaultLibraryAll = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}fault/getFaultLibraryAll`,
    // url: `http://localhost:10101/mes-pda/fault/getFaultLibraryAll`,
    data,
    custom: { loading: true },
  });
};

// 根据工位获取设备
export const getEquipmentList = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}commonBaseEquipmentModeling/list`,
    // url: `http://localhost:10000/common-service/commonBaseEquipmentModeling/list`,
    params,
  });
};
// 根据工单获取设备
export const getProcessListByOrder = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesProdOrder/getProcessListByOrder`,
    // url: `http://localhost:10100/mes-service/mesProdOrder/getProcessListByOrder`,
    params,
  });
};

