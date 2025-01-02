export async function wait(delay=1000,resolveInfo){
    return await new Promise(res=>{
        setTimeout(()=>{
            res(resolveInfo)
        },delay)
    })
}

