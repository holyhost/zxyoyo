import FileBean from '@/models/file'
import { connectToDB } from '@/utils/database'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
    console.log('come into get')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('userid') || ''
    const tags = searchParams.get('tags') || ''
    const type = searchParams.get('type') || ''
    const groupname = searchParams.get('groupname') || ''
    const count = searchParams.get('count') || 20
    const page = searchParams.get('page') || 0
    // should get user id from session, but get null, so client getsession 
    const session = await getServerSession(authOptions)
    // const session = {
    //     user: {
    //         _id: id
    //     }
    // }
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        const backHost = process.env.BACKEND_HOST
        const result = await fetch(backHost + "/filemng/api/imgs?type=latest&page=" + page + "&count=" + count)       
        const data = await result.json()
        if(data && data.status === 'ok'){
            return NextResponse.json({ success: true, data: data.data })
        }
        return NextResponse.json({ success: false, data })
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}

export async function POST(request: NextRequest) {
    console.log('come into post')
    const fd = await request.formData()
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        const backHost = process.env.BACKEND_HOST
        const result = await fetch(backHost + "/filemng/api/file/sucai",{
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