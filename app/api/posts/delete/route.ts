import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Post from '@/models/post'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
    console.log('come into post delete')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    console.log('id', id)
    if( !id || id.length < 10){
        return NextResponse.json({ success: false }, {status: 401})
    }
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        // user can only delete self file
        await Post.findOneAndDelete({
            uid: uid,
            name: id
        })
        revalidateTag('post')
        
        return NextResponse.json({ success: true})
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}