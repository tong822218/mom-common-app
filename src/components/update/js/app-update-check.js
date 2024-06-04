///检查是否更新
import adminUrl from "@/axios/url";
const { baseUrl } = adminUrl();
// type  1手动点击更新  0是自动检查
export function checkUpdate(type = 0) {
  return new Promise((reolve, reject) => {
    // 获取版本号
    plus.runtime.getProperty(plus.runtime.appid, async (inf) => {
      console.log("当前版本", inf.version);

      const isUpdata = await uni.$u.http.request({
        method: "GET",
        url: `${baseUrl()}/auth/baseAppFile/update`,
        params: {
          filename: "baseApp",
          version: inf.version,
          type: "android",
        },
      });
      console.log("app更新", isUpdata);
      if (!isUpdata.data.result) return;

      let update_info = {
        version: "1.0.2", //线上版本
        now_url: isUpdata.data.result.downloadUrl, //更新链接
        silent: 0, //是否是静默更新
        force: 1, //是否是强制更新
        net_check: 1, //非WIfi是否提示
        note: isUpdata.data.result.remark, //更新内容
      };

      // let need_update = await compareVersion(inf.version, update_info.version); // 检查是否需要升级（对比版本号）
      // if (!need_update) {
      //     return reolve({
      //         msg: '已经是最新版本了',
      //     });
      // } //不需要更新

      //需要更新，判断是不是静默更新
      if (/\.wgt$/.test(update_info.now_url) && update_info.silent == 1) {
        console.log("静默更新");
        if (type == 1) {
          return reolve({
            msg: "已经是最新版本了",
          });
        }
        startSilentUpdate(update_info.now_url); //开始静默更新
        return reolve({
          msg: "",
        });
      }

      // //判断当前版本是不是点击过暂不更新
      // let update_ignore_version = uni.getStorageSync('update_ignore') || '0.0.0';

      // console.log('强制更新', update_info.force);
      // if (
      //     type === 0 &&
      //     update_ignore_version == update_info.version &&
      //     update_info.force === 0
      // ) {
      //     console.log('之前取消过这个版本，就不再提示了');
      //     return reolve({
      //         msg: '',
      //     });
      // }

//      弹出更新
       uni.navigateTo({
           url: '/pages/appUpdate/app-update?updata_info=' + JSON.stringify(update_info),
           animationType: 'fade-in',
       });
    });
  });
}

//对比版本号
function compareVersion(ov, nv) {
  return new Promise((reolve, reject) => {
    if (!ov || !nv || ov == "" || nv == "") {
      return reolve(false);
    }
    let b = false;
    let ova = ov.split(".", 4);
    let nva = nv.split(".", 4);
    for (let i = 0; i < ova.length && i < nva.length; i++) {
      let so = ova[i],
        no = parseInt(so),
        sn = nva[i],
        nn = parseInt(sn);
      if (nn > no || sn.length > so.length) {
        return reolve(true);
      } else if (nn < no) {
        return reolve(false);
      }
    }
    if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
      return reolve(true);
    } else {
      return reolve(false);
    }
  });
}

//开始静默更新
function startSilentUpdate(url) {
  let options = {
    method: "get",
  };
  console.log("开始静默更新", url);
  let dtask = plus.downloader.createDownload(url, options);
  dtask.addEventListener("statechanged", function (task, status) {
    if (status === null) {
    } else if (status == 200) {
      //在这里打印会不停的执行，请注意，正式上线切记不要在这里打印东西///////////////////////////////////////////////////
      switch (task.state) {
        case 4:
          console.log("下载结束", task.filename);
          installWgt(task.filename); // 安装
          break;
      }
    }
  });
  dtask.start();
}

// 安装文件
function installWgt(path) {
  plus.runtime.install(path);
}
