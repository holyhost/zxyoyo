import { NextRequest, NextResponse } from 'next/server'


export async function GET(request:NextRequest) {
    console.log(request.url)
    const backHost = process.env.BACKEND_SHARE_HOST
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name') || ''
    const month = searchParams.get('month') || ''
    if(!name || !month) return NextResponse.json({ success: false, data: []})
    try {
        const data = await fetch( backHost + "/router/add?name="+name +"&month=" + month)
        const jsonData = await data.json()
        return NextResponse.json({ success: true, data: jsonData})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false },{ status: 500})
    }
}


