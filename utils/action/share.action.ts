
export const getShareListInfo = async(tradeDate:string,perChange: number = -100.1 )=>{
    const res = {
        ok: false,
        res: new Array()
    }
    try {
        const result = await (await fetch(`/api/share?tradeDate=${tradeDate}&perChange=${perChange}`)).json()
        res.ok = result.ok
        res.res = result.res
    } catch (error) {
        console.log('share action error: get share list ino ')
        console.log(error)
    }
    return res
    
}