import {throwNotInBrowserErrInfo} from "./utils.js";
import * as XLSX from 'xlsx'
import * as DOCX from 'docx'

const {TableCell,TableRow,Packer,Paragraph,Document,Table} = DOCX

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
    const csv =  XLSX.utils.sheet_to_csv(worksheet,{header:1,FS:",",RS:"\n"});
    return new Blob([new Uint8Array(0xEF,0xBB,0XBF),csv], {type: 'text/csv;charset=utf-8'});
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

export const excel2Txt = (arrayBuffer,omitKeys=[],splitSymbol = ',')=>{
    const jsonData = excel2Json(arrayBuffer,omitKeys);
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

export const excel2Word = async(arrayBuffer,omitKeys)=>{
    const jsonData = excel2Json(arrayBuffer,omitKeys);
    const headerKeys = Object.keys(jsonData[0])
    const genHeader = ()=> new TableRow({
        children: headerKeys.map(i=>{
            return new TableCell({
                children:[new Paragraph(i) ]
            })
        })
    })
    const genBody = ()=>{
        return jsonData.map(row=>{
            return new TableRow({
                children: headerKeys.map(key=>{
                    return new TableCell({
                        children:[new Paragraph(row[key].toString()) ]
                    })
                })
            })
        })
    }
    const docx = new Document({
        sections:[
            {
                children:[
                    new Table({
                        rows:[
                            genHeader(),
                            ...genBody()
                        ]
                    })
                ]
                      
            }
        ]
    })
    return await Packer.toBlob(docx)
}