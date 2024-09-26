import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Post from '@/models/post'
import User from '@/models/user'

export const getPostById = async (id: string)=> {
    try {
        return await Post.findById(id)
    } catch (error) {
        console.log("query error and id is: " + id)
        return null
    }
    
}

export  const GET = async(request: NextRequest, {params}:{params: any}) => {
    const id = params.id

    // should get user id from session, but get null, so client getsession 
    const session = await getServerSession(authOptions)
    console.log('posts session', session)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        const data = await getPostById(id as string)
        if( data && data.uid.toString() === session.user._id.toString()){
            return NextResponse.json({ success: true, data: data})
        }else{
            console.log('session uid: ', session.user._id)
            console.log('session uid: ', session.user)
            console.log('data uid: ', data._id)
            console.log('uid not match')
        }        
        
        return NextResponse.json({ success: true },{ status: 404})
    }else{
        // return public data
        console.log('get posts public')
        await connectToDB()
        const data = await getPostById(id as string)
        if( data && data.open === 1){
            return NextResponse.json({ success: true, data: data})
        }else{
            console.log('not logined user, can not get private data')
        }    
        return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
    }

    
}

export const PATCH =async (req: NextRequest, {params}:{params: any}) => {
    const jsonData = await req.json()
    try {
        const session = await getServerSession(authOptions)
        if (session && session.user && session.user._id) {
            await connectToDB()
            const existingPost = await Post.findById(params.id)
            if(!existingPost || existingPost.uid != session.user._id) return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
            existingPost.title = jsonData.title
            existingPost.content = jsonData.content
            existingPost.open = jsonData.open
            existingPost.secret = jsonData.secret
            existingPost.type = jsonData.type
            existingPost.cover = jsonData.cover
            existingPost.updateTime = new Date().getTime().toString()
            await existingPost.save()
            return NextResponse.json({ success: true, data: existingPost}) 
        }else{
            return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
        }
        
    } catch (error) {
        console.log('got an error', error)
        return NextResponse.json({ success: false, data: 'system error' }, {status: 500})
    }
}

export const DELETE =async (req: NextRequest, {params}:{params: any}) => {

    try {
        const session = await getServerSession(authOptions)
        if (session && session.user && session.user._id) {
            await connectToDB()
            const existingPost = await Post.findById(params.id)
            if(!existingPost || existingPost.uid != session.user._id) return NextResponse.json({ success: false, data: 'no data' }, {status: 404})
            const result = await Post.findByIdAndRemove(params.id)
            if(existingPost.cover && existingPost.cover.includes('aupload')){
                // delete cover
                const userResult = await User.findById(session.user._id)
                if(!userResult) return NextResponse.json({ success: false, data: 'login pls' }, {status: 401}) 
                const backHost = process.env.BACKEND_HOST
                const fd = new FormData()
                fd.set('keynames', userResult.keynames)
                fd.set('pathname', existingPost.cover)
                const result = await fetch(backHost + "/filemng/api/file/delete",{
                    method: 'POST',
                    body: fd
                }) 
            }
            return NextResponse.json({ success: true, data: result}) 
        }else{
            return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
        }
        
    } catch (error) {
        console.log('got an error', error)
        return NextResponse.json({ success: false, data: 'system error' }, {status: 500})
    }
}