import {injectCommon} from "./utils.js";
import {getType} from "../common/index.js";
// Intersection 交集
injectCommon(Array, 'getIntersection', function (anotherArr) {
    return [...new Set(this.valueOf())].filter(item => new Set(anotherArr.valueOf()).has(item));
})
// Union 并集
injectCommon(Array, 'getUnion', function (anotherArr) {
    return [...new Set([...this.valueOf(), ...anotherArr.valueOf()])]
})
// Difference 差集
injectCommon(Array, 'getDifference', function (anotherArr) {
    return this.valueOf().filter(item => !anotherArr.valueOf().includes(item))
})
// uniq  support number | string | object array 去重 支持数字 | 字符串 | 对象 数组
injectCommon(Array, 'getUniqueArr', function (key) {
    const thisValue = this.valueOf();
    if (thisValue.length === 0) {
        throw new Error(`If u give me an empty array,I'll give u an error,u idiot!!!`);
    } else {
        const firstItem = thisValue[0]
        const arrayType = getType(firstItem)
        const isEveryTypeConsistent = thisValue.every(item => getType(item) === arrayType)
        if (!isEveryTypeConsistent) {
            throw new Error(`Is every element of the same data type? U must open ur fucking eyes and check this array!!!`);
        } else {
            if (['String', 'Number'].includes(arrayType)) {
                return [...new Set(thisValue)]
            }
            if (arrayType === 'Object') {
                const newSet = new Set();
                if (key) {
                    return thisValue.filter(item => {
                        if (newSet.has(item[key])) {
                            return false;
                        }
                        newSet.add(item[key]);
                        return true;
                    });
                } else {
                    return thisValue.filter(item => {
                        const key = JSON.stringify(item);
                        if (newSet.has(key)) {
                            return false;
                        }
                        newSet.add(key);
                        return true;
                    });
                }
            }
            else{
                throw new Error(`Just support number | string | simple object array,u idiot!!!`);
            }
        }
    }
})


