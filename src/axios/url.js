import { localUrl } from "./localUrl";
export default () => {
  let baseUrl = {};
  switch (process.env.VUE_APP_CURRENTMODE) {
    case "dev":
      baseUrl = {
        adminUrl: localUrl.adminUrl,
        mesUrl: localUrl.mesUrl,
        eamUrl: localUrl.eamUrl,
        qmsUrl: localUrl.qmsUrl,
        dataUrl: localUrl.dataUrl,
        mqttUrl: localUrl.mqttUrl,
        minioUrl: localUrl.minioUrl,
      };
      break;
    default:
      baseUrl = {
        adminUrl: process.env.VUE_APP_BASEURL,
        dataUrl: process.env.VUE_APP_DATAURL,
        eamUrl: process.env.VUE_APP_EAMURL,
        mesUrl: process.env.VUE_APP_MESURL,
        qmsUrl: process.env.VUE_APP_QMSURL,
        mqttUrl: location.host,
        minioUrl: process.env.VUE_APP_MINIO,
      };
  }
  return baseUrl
}
