import { injectCommon,parseStr2Number } from "./utils";
injectCommon(String,'toFixed',function(digits = 2){
    return parseStr2Number(this.valueOf()).toFixed(digits)
})
injectCommon(String,'toLocaleString',function(locales=undefined,options=undefined){
    return parseStr2Number(this.valueOf()).toLocaleString(locales,options)
})