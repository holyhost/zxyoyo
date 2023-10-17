import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Post from '@/models/post'

const getPostById = async (id: string)=> await Post.findById(id)

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') || ''
    const pageSize = searchParams.get('pageSize') || 20
    const pageNum = searchParams.get('pageNum') || 0
    // should get user id from session, but get null, so client getsession 
    const session = await getServerSession(authOptions)
    console.log('posts session', session)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        const data = await Post.find({uid: uid})
                .skip(parseInt(pageSize + '') * parseInt(pageNum+''))
                .limit(parseInt(pageSize + ''))
        if( data){
            const total = await Post.count()
            return NextResponse.json({ success: true, data: data, bbb: total })
        }        
        
        return NextResponse.json({ success: true },{ status: 501})
    }else{
        // return public data
        console.log('get posts public')
        await connectToDB()
        const data = await Post.find({open: 1})
                .skip(parseInt(pageSize + '') * parseInt(pageNum+''))
                .limit(parseInt(pageSize + ''))
        if( data){
            const total = await Post.count()
            return NextResponse.json({ success: true, data: data, aaa: total })
        }    
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}