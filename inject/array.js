import { injectCommon } from "./utils.js";
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