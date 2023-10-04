import FileBean from '@/models/file'
import { connectToDB } from '@/utils/database'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
    console.log('come into post')
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    if (!file || !file.name) {
        return NextResponse.json({ success: false })
    }
    const splits = file.name.split('.')
    if(splits.length < 2){
        return NextResponse.json({ success: false })
    }
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        const fileName = randomUUID() + "." + splits[splits.length -1]
        await connectToDB()
        await FileBean.create({
            uid: uid,
            type: file.type,
            size: file.size,
            name: fileName,
            orname: file.name,
            message: "Login failed"
        })
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        // With the file data in the buffer, you can do whatever you want with it.
        // For this, we'll just write it to the filesystem in a new location
        const parentPath = process.env.FILE_UPLOAD_PATH
        const path = `${parentPath}/${fileName}`
        await writeFile(path, buffer)
        console.log(`open ${fileName} to see the uploaded file`)
        return NextResponse.json({ success: true, data: fileName })
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
            return NextResponse.json({ success: true, data: data })
        }        
        
        return NextResponse.json({ success: true },{ status: 501})
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}