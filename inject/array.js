import { injectCommon } from "./utils.js";
injectCommon(Array, 'getIntersection', function (anotherArr) {
    return [...new Set(this.valueOf())].filter(item => new Set(anotherArr.valueOf()).has(item));
})
injectCommon(Array, 'getUnion', function (anotherArr) {
    return [...new Set([...this.valueOf(), ...anotherArr.valueOf()])]
})
injectCommon(Array, 'getDifference', function (anotherArr) {
    return this.valueOf().filter(item => !anotherArr.valueOf().includes(item))
})