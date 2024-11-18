import { NextRequest, NextResponse } from 'next/server'


export async function GET(params:NextRequest) {
    const sp = params.nextUrl.searchParams
    console.log(params.url.search.toString())
    const page = (sp.get('page') || 1) as number
    const count = (sp.get('count')  || 6) as number
    const result = await fetch(process.env.BACKEND_A_HOST + '/shareapi/test/query?page=' + page + '&count=' + count)
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


