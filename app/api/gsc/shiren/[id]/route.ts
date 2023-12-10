import { NextRequest, NextResponse } from 'next/server'

export  const GET = async(request: NextRequest, {params}:{params: any}) => {
    const id = params.id
    const backHost = process.env.BACKEND_HOST
    try {
        const data = await fetch( backHost + "/api/v1/gsc/poet/" + id)
        const jsonData = await data.json()
        return NextResponse.json({ success: true, data: jsonData.data})
    } catch (error) {
        return NextResponse.json({ success: true },{ status: 500})
    }

    
}

