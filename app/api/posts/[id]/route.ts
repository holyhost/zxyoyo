import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Post from '@/models/post'

const getPostById = async (id: string)=> await Post.findById(id)

export  const GET = async(request: NextRequest, {params}:{params: any}) => {
    const id = params.id

    // should get user id from session, but get null, so client getsession 
    const session = await getServerSession(authOptions)
    console.log('posts session', session)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        const data = await getPostById(id as string)
        if( data){
            return NextResponse.json({ success: true, data: data})
        }        
        
        return NextResponse.json({ success: true },{ status: 404})
    }else{
        // return public data
        console.log('get posts public')
        await connectToDB()
        const data = await getPostById(id as string)
        if( data){
            return NextResponse.json({ success: true, data: data})
        }    
        return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
    }

    
}

export const PATCH =async (req: NextRequest, {params}:{params: any}) => {
    const { aa, bb} = await req.json()
    try {
        await connectToDB()
        const existingPost = await Post.findById(params.id)
        if(!existingPost) return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
        existingPost.image = aa
        await existingPost.save()
        return NextResponse.json({ success: true, data: existingPost}) 
    } catch (error) {
        console.log('got an error', error)
        return NextResponse.json({ success: false, data: 'system error' }, {status: 500})
    }
}

export const DELETE =async (req: NextRequest, {params}:{params: any}) => {
    const { aa, bb} = await req.json()
    try {
        await connectToDB()
        const existingPost = await Post.findByIdAndRemove(params.id)
        if(!existingPost) return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
        existingPost.image = aa
        await existingPost.save()
        return NextResponse.json({ success: true, data: existingPost}) 
    } catch (error) {
        console.log('got an error', error)
        return NextResponse.json({ success: false, data: 'system error' }, {status: 500})
    }
}