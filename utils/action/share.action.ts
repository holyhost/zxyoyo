import { ShareTestBean } from "@/components/Share/ShareTest/ShareTest"
import { ResType } from "@/types/base.type"

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

export const getShareTestResult = async(page=0, count=10,tradeDate='', testType='', maTags='') => {
    const res: ResType<ShareTestBean[]> = {
        success: false,
        data: []
    }
    try {
        let dd = ''
        if(testType === 'day-ma'){
            dd = tradeDate
        }
        const result = await (await fetch(`/api/share/test?page=${page}&count=${count}&testType=${testType}&testDate=${dd}&maTags=${maTags}`)).json()
        res.success = result.ok
        res.data = result.res
    } catch (error) {
        console.log('share action error: get share list ino ')
        console.log(error)
    }
    return res
}