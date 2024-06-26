import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'


export  const GET = async(request: NextRequest, {params}:{params: any}) => {
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const backHost = process.env.BACKEND_HOST
        const url = backHost + "/shareapi/basic"
        // console.log(url)
        const data = await fetch( url)
        const jsonData = await data.json()
        if( data){
            return NextResponse.json({ success: true, data: jsonData.data})
        }        
        
        return NextResponse.json({ success: true },{ status: 404})
    }else{
        // return public data
        return NextResponse.json({ success: false, data: 'basic no data' }, {status: 404})
    }

    
}
