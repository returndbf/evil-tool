async function e(){await Promise.resolve().then((function(){return i})),await Promise.resolve().then((function(){return o})),await Promise.resolve().then((function(){return u}))}async function t(e=1e3,t){return await new Promise((n=>{setTimeout((()=>{n(t)}),e)}))}function n(e,t,n){e.prototype[t]=n}function r(e){return Number.parseFloat(e)}n(Array,"getIntersection",(function(e){return[...new Set(this.valueOf())].filter((t=>new Set(e.valueOf()).has(t)))})),n(Array,"getUnion",(function(e){return[...new Set([...this.valueOf(),...e.valueOf()])]})),n(Array,"getDifference",(function(e){return this.valueOf().filter((t=>!e.valueOf().includes(t)))}));var i=Object.freeze({__proto__:null}),o=Object.freeze({__proto__:null});n(String,"toFixed",(function(e=2){return r(this.valueOf()).toFixed(e)})),n(String,"toLocaleString",(function(e=void 0,t=void 0){return r(this.valueOf()).toLocaleString(e,t)}));var u=Object.freeze({__proto__:null});export{e as importInject,t as wait};
//# sourceMappingURL=bundle.esm.js.map
