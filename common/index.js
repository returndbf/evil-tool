export async function wait(delay=1000,resolveInfo){
    return await new Promise(res=>{
        setTimeout(()=>{
            res(resolveInfo)
        },delay)
    })
}

export function urlSearch(url= undefined){
    let innerUrl = ""
    let instance  = null

    if(typeof window === 'undefined' && !url){
        throw new Error(`give me url,u idiot!u aren't in browser`)
    }
    innerUrl = url || window.location.href
    instance = new URLSearchParams("?"+innerUrl.split('?')[1])
    return {
        getProperty(key){
            return instance.get(key)
        },
        getAllProperty(){
            const properties = {}
            for (const [key,value] of instance.entries()) {
                properties[key] = value
            }
            return properties
        },
        instance
    }
}