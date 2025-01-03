import test from 'node:test';
import assert from 'assert';

import {importInject} from "../inject/index.js";

await importInject()

const numberArr = [1,1]
const notSameTypeArr = ["1",1]
const stringArr = ["1","1"]
const objArr = [{a:1,b:2},{a:1,b:3}]
const objArr1 = [{a:1,b:2},{a:1,b:2}]
test('number Array  remove duplicate', () => {
    assert.deepStrictEqual(numberArr.getUniqueArr(), [1]);
});
test('string Array  remove duplicate', () => {
    assert.deepStrictEqual(stringArr.getUniqueArr(), ["1"]);
});
test('test not same type', () => {
    assert.deepStrictEqual(notSameTypeArr.getUniqueArr(), [1]);
});
test('object Array with key remove duplicate', () => {
    assert.deepStrictEqual(objArr.getUniqueArr('a'), [{a:1,b:2}]);
});
test('object Array  remove duplicate', () => {
    assert.deepStrictEqual(objArr1.getUniqueArr(), [{a:1,b:2}]);
});