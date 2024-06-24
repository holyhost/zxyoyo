import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'


export  const GET = async(request: NextRequest, {params}:{params: any}) => {
    const id = params.id
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const { searchParams } = new URL(request.url)
        const startDate = searchParams.get('startDate') || ''
        const endDate = searchParams.get('endDate') || ''
        const backHost = process.env.BACKEND_HOST
        const url = backHost + "/shareapi/dayk?tscode=" + id + "&startDate=" + startDate + "&endDate=" + endDate
        // console.log(url)
        const data = await fetch( url)
        const jsonData = await data.json()
        if( data){
            return NextResponse.json({ success: true, data: jsonData.data})
        }        
        
        return NextResponse.json({ success: true },{ status: 404})
    }else{
        // return public data
        console.log('get share public')
        return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
    }

    
}
