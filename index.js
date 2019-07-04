/**
 * Created by ruanyangyang on 2018/11/5.
 */
let moment = require('moment'); //load moment module to set local language
require('moment/locale/zh-cn'); //for import moment local language file during the application build
moment.locale('zh-cn');//set moment local language to zh-cn

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


// 生成当前默认时间
const getCurrentdefaultTime = () => {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

export const getExpiryDate = (AddDayCount=10) => {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
};


export const getCurrentDateWidthFormat = format => {
    if (format !== undefined)
        return new Date().Format(format);
    else
        return getCurrentdefaultTime();
};
//  日期格式转换
export const getCurrentDateWidthFormatPro=(format='YYYY/MM/DD',time)=>{
    let create_at = moment(time).format(format);
    return create_at;
}

export const ResolveTime = (time) => {
    // var datestr = time.toString().replace(/-/g, "/");
    // var date = new Date(datestr);
    // var y = date.getFullYear();
    // var m = date.getMonth() + 1;
    // m = m < 10 ? ('0' + m) : m;
    // var d = date.getDate();
    // d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // minute = minute < 10 ? ('0' + minute) : minute;
    // second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    return time;
};

/**
 * 时间简介函数
 */

export const afterTime = expired_at => {
    let startTime = new Date(); // 开始时间
    let endTime = new Date(ResolveTime(expired_at)); // 结束时间
    let usedTime = endTime - startTime; // 相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
    let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
    let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
    let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
    let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
    days = days + 1;
    return days;
};