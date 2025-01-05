import { CTRLKEY, JPEGTYPE, JPGTYPE, PNGTYPE, KEY, METAKEY } from "../constant/index.js";
import {  throwNotInBrowserErrInfo } from "./utils.js";


export const editDocument = () => {
    throwNotInBrowserErrInfo()
    document.body.contentEditable = 'true'
}

export const prettyLog = () => {
    throwNotInBrowserErrInfo()
    const isEmpty = (value) => {
        return value == null || value === undefined || value === '';
    };
    const prettyPrint = (title, text, color) => {
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        );
    };
    // 基础信息打印
    const info = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Info' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#909399');
    };
    return {
        info
    };
};


export function pasteImage(domTarget, cb = null, key1 = CTRLKEY, key2 = 'v') {
    return new Promise((resolve, reject) => {
        const handler = async function (event) {
            let operate = (event[CTRLKEY] || event[METAKEY])
            if(key1 !== CTRLKEY){
                operate = event[key1]
            }
            try {
                if (operate && event[KEY] === key2) {
                    event.preventDefault();

                    const clipboardItems = await navigator.clipboard.read();
                    for (const clipboardItem of clipboardItems) {
                        const types = clipboardItem.types;
                        if (types.includes(PNGTYPE) || types.includes(JPEGTYPE) || types.includes(JPGTYPE)) {
                            const blob = await clipboardItem.getType(types[0]);

                            const reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = () => {
                                const result = reader.result;
                                if (cb) {
                                    cb(result);
                                }

                                resolve(result);
                            };

                            reader.onerror = () => {
                                reject(new Error(`U aren't copy any image in ur clipboard,u idiot!!!`));
                            };
                        }
                    }
                }
            } catch (error) {
                reject('An error occurred,idiot:' + error);
            }
        };
        domTarget.addEventListener('keydown', handler);
    });
}
