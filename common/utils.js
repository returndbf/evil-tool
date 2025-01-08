import { BROWSER, NODE, WINOS, MACOS, OTHEROS, PNGTYPE } from "../constant/index.js";

export function getEnv() {
    if (typeof window !== 'undefined') {
        return BROWSER;
    } else {
        return NODE
    }
}
export function getOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes(WINOS)) return WINOS
    if (userAgent.includes(MACOS)) return MACOS
    return OTHEROS
}

export function throwNotInNodeErrInfo(operate = true, message = "") {
    if (getEnv() === BROWSER && operate) {
        throw new Error(message || `u idiot!u aren't in node!!!`);
    }
}

export function throwNotInBrowserErrInfo(operate = true, message = "") {
    if (getEnv() === NODE && operate) {
        throw new Error(message || `u idiot!u aren't in browser!!!`);
    }
}
export function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
function generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, length);
}


export function convertBlobToFile(blob, fileName = generateRandomString()) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const content = reader.result
            const type = blob.type || PNGTYPE
            const fileExtension = type.split('/')[1]
            const file = new File([blob], `${fileName}.${fileExtension}`, { type })
            resolve({
                content,
                file,
            })
            reader.onerror = () => {
                reject(new Error(`An error occurred,idiot:${reader.error}`))
            }
            reader.readAsDataURL(blob)
        }
    })
}

export async function fetchImageAsBlob(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Network not ok,idiot:${response.statusText}`)
    }
    const blob = await response.blob()
    return blob

}
