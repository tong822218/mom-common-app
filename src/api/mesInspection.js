const http = uni.$u.http;
import app from "@/main";
import baseUrl from "@/axios/url";
const { mesUrl, adminUrl, qmsUrl } = baseUrl();

/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 检验类型列表
export const getInspectionList = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/qms_inspection_type_noassignment`,
  });
};

//获取工厂列表
export const getFactoryList = () => {
  // return http.request({
  //     method: 'GET',
  //     url: `${adminUrl}/data/baseFactoryModeling/select?level=3`,
  // });
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

// 根据条码获取型号、订单、检验模板列表等信息
export const getInfoByProdCode = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${qmsUrl}qmsInspection/getInfoByProdCode`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/getInfoByProdCode`,
    custom: { loading: true },
  });
};

// 根据编码获取检测项
export const getItemByTemplateCode = (data) => {
  return http.request({
    method: "POST",
    data,
    url: `${qmsUrl}qmsInspection/getItemByTemplateCode`,
    custom: { loading: true },
  });
};

// 保存检验结果
export const saveInspectionResult = (data) => {
  return http.request({
    method: "POST",
    data,
    url: `${qmsUrl}qmsInspection/saveInspectionResult`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/saveInspectionResult`,
    custom: { loading: true },
  });
};

// 确认检验完成
export const confirmCompleted = (data) => {
  return http.request({
    method: "POST",
    data,
    url: `${qmsUrl}qmsInspection/confirmCompleted`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/confirmCompleted`,
    custom: { loading: true },
  });
};

// 根据检验结果id获取检验结果
export const getResultListByResultId = (data) => {
  return http.request({
    method: "POST",
    data,
    url: `${qmsUrl}qmsInspection/getResultListByResultId`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/getResultListByResultId`,
    custom: { loading: true },
  });
};

// 获取关联设备列表
export const getCommonBaseEquipment = (data) => {
  return http.request({
    method: "GET",
    data,
    url: `${adminUrl}commonBaseEquipment/list`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/getResultListByResultId`,
    custom: { loading: true },
  });
};

// 数据字典
export const getDictData = (data) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/${data}`,
    custom: { loading: true },
  });
};
// 根据设备编码获取区域列表
export const getAreaList = (data) => {
  return http.request({
    method: "GET",
    data,
    url: `${adminUrl}commonBaseEquipmentModeling/list`,
    custom: { loading: true },
  });
};

// 获取工单信息
export const getPrdMsg = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/getPrdMsg`,
    // url: `http://localhost:10101/mes-pda/mesLoadMaterialVerification/getPrdMsg`,
  });
};
// 检验类型列表
export const getInspectionType = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/qms_inspection_type`,
  });
};
// 检验类型z状态列表
export const getStatusList = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/qms_sampling_status`,
  });
};


// 检验模版关联检验项动态列表查询
export const getInspectionTemplateClassification = (data) => {
  return http.request({
    method: "GET",
    data,
    url: `${qmsUrl}qmsInspectionTemplateClassification/list`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/getResultListByResultId`,
    custom: { loading: true },
  });
};

// 根据检验单id获取样品列表
export const getSamplelist = (data) => {
  return http.request({
    method: "GET",
    data,
    url: `${qmsUrl}qmsInspection/getSamplelist`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/getResultListByResultId`,
    custom: { loading: true },
  });
};


// 根据检验单id获取样品列表
export const judgeClassification = (data) => {
  return http.request({
    method: "GET",
    data,
    url: `${qmsUrl}qmsInspectionTemplateClassification/judgeClassification`,
    // url: `http://localhost:10701/qms-pda/qmsInspection/getResultListByResultId`,
    custom: { loading: false },
  });
};

//根据检验类型查询检验模型
export const getInspectionModel = (params) => {
  return http.request({
    method: "GET",
    url: `${qmsUrl}qmsInspectionModel/getInspectionModel`,
    params,
    custom: {
      loading: true,
    },
  });
};

//根据检验单号查询取样任务
export const getSamplingTaskByinspectionOrderNumber = (params) => {
  return http.request({
    method: "GET",
    url: `${qmsUrl}qmsSamplingTask/getSamplingTaskByinspectionOrderNumber`,
    params,
    custom: {
      loading: true,
    },
  });
};


//根据取样单号查询样品列表
export const qmsSamplingTask = (params) => {
  return http.request({
    method: "GET",
    url: `${qmsUrl}qmsSamplingTask/getSamplingTaskDetailBySamplingTaskCode`,
    params,
    custom: {
      loading: true,
    },
  });
};

//根据取样单号查询样品列表
export const qmsSamplingTaskList = (params) => {
  return http.request({
    method: "GET",
    url: `${qmsUrl}qmsSamplingTask`,
    params,
    custom: {
      loading: true,
    },
  });
};

