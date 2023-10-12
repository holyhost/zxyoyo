import FileBean from '@/models/file'
import { connectToDB } from '@/utils/database'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Post from '@/models/post'

export async function POST(request: NextRequest) {
    console.log('come into post')
    const {title, type, content, open, secret} = await request.json()
    
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        await Post.create({
            title,
            type,
            content,
            open,
            secret,
            uid
        })

        return NextResponse.json({ success: true })
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}

export async function GET(request: NextRequest) {
    console.log('come into get')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const pageSize = searchParams.get('pageSize') || 20
    const pageNum = searchParams.get('pageNum') || 0
    // should get user id from session, but get null, so client getsession 
    // const session = await getServerSession(authOptions)
    const session = {
        user: {
            _id: id
        }
    }
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        const data = await FileBean.find({uid: uid})
                .skip(parseInt(pageSize + '') * parseInt(pageNum+''))
                .limit(parseInt(pageSize + ''))
        if( data){
            const total = await FileBean.count()
            return NextResponse.json({ success: true, data: data, total: total })
        }        
        
        return NextResponse.json({ success: true },{ status: 501})
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}