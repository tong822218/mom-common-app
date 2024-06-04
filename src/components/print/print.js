import request from "../../common/http.js";
import tsc from "../../utils/gprint/tsc.js";

const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { baseUrl } = adminUrl();

function printData(uuid, val) {
  uni.showLoading({
    title: "打印中",
  });

  var data = [];
  http.request(
    "/check/print",
    {
      barcode: val,
    },
    "POST",
    (res) => {
      if (!res.data.success) {
        uni.showToast({
          title: res.data.msg,
          icon: "none",
          duration: 3000,
        });
      }
      if (res.data.result) {
        data = res.data.result.dataList;
        //标签模式
        var command = tsc.jpPrinter.createNew();
        for (let i = 0; i < data.length; i++) {
          let valLength = data[i].barcode.length;
          let a = "";
          for (let i = 0; i < 5; i++) {
            if (valLength[i] != 0) {
              a = i;
              break;
            }
          }

          let barcode = data[i].barcode ? data[i].barcode : "";

          command.setSize(75, 64);
          command.setGap(2);
          command.setCls();
          //横线  自上至下
          command.setBar(10, 5, 550, 3);
          command.setBar(10, 445, 550, 3);
          //竖线 自左至右
          command.setBar(10, 5, 3, 440);
          command.setBar(560, 5, 3, 440);

          //物料号
          command.setText(30, 130, "TSS16.BF2", 2, 2, barcode);
          //物料描述
          // command.setText(30, 180, "TSS16.BF2", 2, 2, "物 料 号: " + goodsCode);

          command.setPagePrint();
        }

        senBlData(
          uuid.deviceId,
          uuid.serviceId,
          uuid.characteristicId,
          command.getData()
        );
      }
    }
  );
}
/** 蓝牙设备传值方法
 * @param {Object} deviceId
 * @param {Object} serviceId
 * @param {Object} characteristicId
 * @param {Object} uint8Array
 */
function senBlData(deviceId, serviceId, characteristicId, uint8Array) {
  let _that = this;
  var uint8Buf = Array.from(uint8Array);

  function split_array(datas, size) {
    var result = {};
    var j = 0;
    for (var i = 0; i < datas.length; i += size) {
      result[j] = datas.slice(i, i + size);
      j++;
    }
    return result;
  }
  var sendloop = split_array(uint8Buf, 20);

  function realWriteData(sendloop, i) {
    var data = sendloop[i];
    if (typeof data == "undefined") {
      return;
    }
    var buffer = new ArrayBuffer(data.length);
    var dataView = new DataView(buffer);
    for (var j = 0; j < data.length; j++) {
      dataView.setUint8(j, data[j]);
    }
    // console.log('serviceId========>',serviceId)
    uni.writeBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      value: buffer,
      success(res) {
        realWriteData(sendloop, i + 1);
        uni.hideLoading();
      },
      fail(e) {
        console.log("eeeeeeeeeeee========>", e);
        uni.hideLoading();
        if (e.errCode == "10007") {
          uni.showToast({
            title: "请再次打印！",
            icon: "none",
            duration: 5000,
          });
        } else if (e.errCode == "10000") {
          uni.showToast({
            title:
              "请确认打印机是否开启，并处于蓝牙适用范围；若正常，请断开蓝牙连接，重新连接！",
            icon: "none",
            duration: 5000,
          });
        } else if (e.errCode == "10004") {
          uni.showToast({
            title:
              "请确认打印机是否开启，并处于蓝牙适用范围；若正常，请断开蓝牙连接，重新连接！",
            icon: "none",
            duration: 5000,
          });
        } else {
          uni.showToast({
            title:
              "请确认打印机是否开启，并处于蓝牙适用范围；若正常，请断开蓝牙连接，重新连接！",
            icon: "none",
            duration: 5000,
          });
        }
      },
    });
  }
  var i = 0;
  realWriteData(sendloop, i);
}
export default printData;
