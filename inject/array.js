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

                const generateKey = key ? item => item[key] : item => JSON.stringify(item);
                return thisValue.filter(item => {
                    const uniqueKey = generateKey(item);
                    if (uniqueKey === undefined || uniqueKey === null) {
                        return false;
                    }
                    if (newSet.has(uniqueKey)) {
                        return false;
                    }
                    newSet.add(uniqueKey);
                    return true;
                });
            } else {
                throw new Error(`Just support number | string | simple object array,u idiot!!!`);
            }
        }
    }
})
// flat array to tree 扁平数组转为树结构
injectCommon(Array, 'getTree', function (key = 'id', parentKey = 'parentId', childrenKey = 'children') {
    const thisValue = this.valueOf()
    const map = new Map(thisValue.map(item => [item[key], item]));
    return thisValue.reduce((resultArray, item) => {
        // 找到父元素
        const parent = map.get(item[parentKey]);
        if (parent) {
            // 如果父元素存在，将当前元素添加到父元素的 children 数组中
            (parent[childrenKey] || (parent[childrenKey] = [])).push(item);
        } else {
            // 否则，当前元素就是根节点
            resultArray.push(item);
        }
        return resultArray;
    }, []);

})

