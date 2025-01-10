# evil-tool
some common functions，and some inject functions to js data type prototype

## Usage

### esm
```js
import {wait,urlSearch,CusLog} from "evil-tool"
```

### cjs
```js
const {wait,urlSearch,CusLog} = require("evil-tool")
```
 
### demo
```js

async function test(){
    const searchObj = urlSearch("https://www.baidu.com/s?ie=UTF-8")
    console.log(searchObj.getProperty("ie")) //UTF-8
    await wait(2000) //sync delay 2000ms
    // CusLog class only support browser environment
    CusLog.info('hello') // press f12,check browser Console
}
```

### doc address
[evil-tool-doc](https://evil.wmqqxf.top/)
