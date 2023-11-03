import FileBean from '@/models/file'
import { connectToDB } from '@/utils/database'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
    console.log('come into post')
    const fd = await request.formData()
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        const backHost = process.env.BACKEND_HOST
        const result = await fetch(backHost + "/filemng/api/file/delete",{
            method: 'POST',
            body: fd
          })       
        const data = await result.json()
        if(data && data.status === 'ok'){
            return NextResponse.json({ success: true, data: data.data })
        }
        return NextResponse.json({ success: false, data })
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}
