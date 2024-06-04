// 判断是否为空
export const isEmpty = value => {
    return [null, '', 'undefined', undefined].includes(value);
};

// 邮箱
export const isEmail = s => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
};
// 手机号码

export const isMobile = s => {
    return /^1[0-9]{10}$/.test(s);
};
// 电话号码

export const isPhone = s => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};
// 4.是否url地址
export const isURL = s => {
    return /^http[s]?:\/\/.*/.test(s);
};

//.去除html标签
export const removeHtmltag = str => {
    return str.replace(/<[^>]+>/g, '');
};

// .判断两个对象是否键值相同
export const isObjectEqual = (a, b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
};

// 时间格式化
// 使用方法
// let date = new Date()
// dateFormat("YYYY-mm-dd HH:MM", date)
export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
// 防抖
export const debounce = function (fn, delay) {
    let timer = null
    return function (value) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, value)
      }, delay)
    }
  }
  /**
   * @description  数组去重
   * @author bing
   * @date 2022-03-16 17:16
   * @param {Array} arr  原属数据
   * @param {String} key  指定根据哪个字段去重
   * @returns {*}
   */
  export const uniqueKey = (arr, key) => {
    const map = new Map()
    return arr.filter((item) => !map.has(item[key] + "") && map.set(item[key] + "", 1))
  }
  