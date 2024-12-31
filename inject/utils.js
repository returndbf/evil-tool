export function injectCommon(type,fnName,cb){
    type.prototype[fnName] = cb
}

export function parseStr2Number(str){
    return Number.parseFloat(str)
}