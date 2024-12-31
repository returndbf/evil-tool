# evil-tool
some common functions，and some inject function to js data type prototype

## Usage

### esm
```js
import {wait, importInject} from "evil-tool"
```

### cjs
```js
const {wait, importInject} = require("evil-tool")
```
 
### demo
```js
importInject()
async function test(){
    console.log("100000.123456".toFixed(2)) // 100000.123
    await wait(2000) //sync delay 2000ms
    console.log("100000.123456".toLocaleString()) // 100,000.123
}
```
