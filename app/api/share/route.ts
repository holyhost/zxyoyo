import { NextRequest, NextResponse } from 'next/server'


// export async function GET(request:NextRequest) {
//     console.log(request.url)
//     const backHost = process.env.BACKEND_SHARE_HOST
//     const { searchParams } = new URL(request.url)
//     const name = searchParams.get('name') || ''
//     const month = searchParams.get('month') || ''
//     if(!name || !month) return NextResponse.json({ success: false, data: []})
//     try {
//         const data = await fetch( backHost + "/router/add?name="+name +"&month=" + month)
//         const jsonData = await data.json()
//         return NextResponse.json({ success: true, data: jsonData})
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ success: false },{ status: 500})
//     }
// }

export async function GET(params:NextRequest) {
    const sp = params.nextUrl.searchParams
    const tradeDate = sp.get('tradeDate') || '20241016'
    const perChange = (sp.get('perChange')  || -100.1) as number
    // const conn = await connectDB()
    // if(!conn) return Response.json({ok: false})
    const result = await fetch(process.env.BACKEND_A_HOST + '/shareapi/dayinfo?trade_date=' + tradeDate + '&pct_chg=' + perChange)
    const jsonData = await result.json()
    const data = {
        ok: true,
        res: []
    }
    if(result && result.status){
        data.res = jsonData.data
    }else{
        data.ok = false
    }

    return Response.json(data)
}


