import FileBean from '@/models/file'
import { connectToDB } from '@/utils/database'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Post from '@/models/post'
import { revalidateTag } from 'next/cache'

export const POST = async(request: NextRequest)=> {
    console.log('come into post')
    const {title, type, content, open, secret, cover, tag} = await request.json()
    
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        const createTime = new Date().getTime().toString()
        const updateTime = createTime
        await connectToDB()
        await Post.create({
            title,
            type,
            content,
            tag,
            open,
            secret,
            cover,
            uid,
            createTime,
            updateTime
        })
        revalidateTag('post')
        return NextResponse.json({ success: true })
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}

export const GET = async(request: NextRequest)=> {
    console.log('posts come into get')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const pageSize = searchParams.get('pageSize') || 20
    const pageNum = searchParams.get('pageNum') || 0
    const postType = searchParams.get('type') || ''
    // should get user id from session, but get null, so client getsession 
    const session = await getServerSession(authOptions)
    console.log('get session')
    if (session && session.user && session.user._id) {
        console.log('get posts all')
        const uid = session.user._id.toString()
        await connectToDB()
        const filters = postType ? {uid: uid, type: postType} : {uid: uid}
        const data = await Post.find(filters)
                .sort({createTime: -1})
                .limit(parseInt(pageSize + ''))
                .skip(parseInt(pageSize + '') * parseInt(pageNum+''))
        if( data){
            const total = await Post.count()
            return NextResponse.json({ success: true, data: data, bbb: total })
        }        
        
        return NextResponse.json({ success: true },{ status: 501})
    }else{
        // return public data
        console.log('get posts public')
        await connectToDB()
        const filters = postType ? {open: 1, type: postType} : {open: 1}
        let data = await Post.find(filters)
                .sort({updateTime: -1})
                .limit(parseInt(pageSize + ''))
                .skip(parseInt(pageSize + '') * parseInt(pageNum+''))
                
        if(data.length > 0){
            data.forEach(item => {
                if(item.content.length > 200) item.content = item.content.substring(0, 200) + '...'
            })
        }
        if( data){
            const total = await Post.count()
            return NextResponse.json({ success: true, data: data, aaa: total })
        }    
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}