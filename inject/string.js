import { injectCommon,parseStr2Number } from "./utils.js";
// toFixed 保留小数
injectCommon(String,'toFixed',function(digits = 2){
    return parseStr2Number(this.valueOf()).toFixed(digits)
})
// toLocaleString 特定于语言环境的表示字符串
injectCommon(String,'toLocaleString',function(locales=undefined,options=undefined){
    return parseStr2Number(this.valueOf()).toLocaleString(locales,options)
})