import {BROWSER, NODE} from "../constant/index.js";

export function getEnv() {
    if (typeof window !== 'undefined') {
        return BROWSER;
    } else {
        return NODE
    }
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