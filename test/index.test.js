import test from 'node:test';
import assert from 'assert';

import {importInject} from "../inject/index.js";

await importInject()

const numberArr = [1,1]
const notSameTypeArr = ["1",1]
const stringArr = ["1","1"]
const objArr = [{a:1,b:2},{a:1,b:3}]
const objArr1 = [{a:1,b:2},{a:1,b:2}]
const flatArray = [
    { id: 2, parentId: 1, name: 'Child 1-1' },
    { id: 3, parentId: 1, name: 'Child 1-2' },
    { id: 4, parentId: 2, name: 'Child 2-1' },
    { id: 1, parentId: null, name: 'Root 1' }, // 顶级节点放在最后
    { id: 6, parentId: 5, name: 'Child 2-1' },
    { id: 5, parentId: null, name: 'Root 2' }
];

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
test('flat array to tree', () => {
    assert.deepStrictEqual(flatArray.getTree('id','parentId','children'), [
        {
            "id": 1,
            "parentId": null,
            "name": "Root 1",
            "children": [
                {
                    "id": 2,
                    "parentId": 1,
                    "name": "Child 1-1",
                    "children": [
                        {
                            "id": 4,
                            "parentId": 2,
                            "name": "Child 2-1"
                        }
                    ]
                },
                {
                    "id": 3,
                    "parentId": 1,
                    "name": "Child 1-2"
                }
            ]
        },
        {
            "id": 5,
            "parentId": null,
            "name": "Root 2",
            "children": [
                {
                    "id": 6,
                    "parentId": 5,
                    "name": "Child 2-1"
                }
            ]
        }
    ]);
});