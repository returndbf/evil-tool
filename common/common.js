import {throwNotInBrowserErrInfo} from "./utils.js";
import * as XLSX from 'xlsx'

export async function wait(delay=1000,resolveInfo){
    return await new Promise(res=>{
        setTimeout(()=>{
            res(resolveInfo)
        },delay)
    })
}



export const urlSearch = (url = undefined) =>{
    let innerUrl = ""
    let instance = null

    throwNotInBrowserErrInfo(!url, `give me url,u idiot!u aren't in browser!!!`)
    innerUrl = url || window.location.href
    instance = new URLSearchParams("?" + innerUrl.split('?')[1])
    return {
        getProperty(key) {
            return instance.get(key)
        },
        getAllProperty() {
            const properties = {}
            for (const [key, value] of instance.entries()) {
                properties[key] = value
            }
            return properties
        },
        instance
    }
}

export function clearConsole (){
    if (typeof console !== 'undefined' && typeof console.clear === 'function') {
        console.clear();
    }
}

export const getExcelWorksheet = (arrayBuffer)=>{
    const workBook = XLSX.read(arrayBuffer, {type: 'array'});
    const firstSheetName = workBook.SheetNames[0];
    return  workBook.Sheets[firstSheetName];
}
export const excel2Csv = (arrayBuffer) => {
    const worksheet = getExcelWorksheet(arrayBuffer);
    return XLSX.utils.sheet_to_csv(worksheet,{header:1,FS:",",RS:"\n"});
}

export const excel2Json = (arrayBuffer,omitKeys=[])=>{
    const worksheet = getExcelWorksheet(arrayBuffer);
    const jsonData=  XLSX.utils.sheet_to_json(worksheet);
    if(omitKeys && omitKeys.length){
        omitKeys.forEach(key=>{
            jsonData.forEach(item=>{
                delete item[key]
            })
        })
    }
    return jsonData
}

export const excel2Txt = (arrayBuffer,splitSymbol = ',')=>{
    const jsonData = excel2Json(arrayBuffer);
    const header = Object.keys(jsonData[0])
    let txtContent = header.join(splitSymbol) + '\n'
    jsonData.forEach(row=>{
        header.forEach(key=>{
            txtContent += row[key] + splitSymbol
        })
        txtContent = txtContent.substring(0,txtContent.length-1) + '\n'
    })
    return new Blob([txtContent], {type: 'text/plain;charset=utf-8'});
    
}