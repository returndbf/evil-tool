import {throwNotInBrowserErrInfo} from "./utils.js";

export function urlSearch(url = undefined) {
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


export function editDocument() {
    throwNotInBrowserErrInfo()
    document.body.contentEditable = 'true'
}
