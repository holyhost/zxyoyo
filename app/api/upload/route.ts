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
        await connectToDB()
        await FileBean.create({
            uid: uid,
            type: file.type,
            size: file.size,
            name: randomUUID() + "." + splits[splits.length -1],
            orname: file.name,
            message: "Login failed"
        })
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        // With the file data in the buffer, you can do whatever you want with it.
        // For this, we'll just write it to the filesystem in a new location
        const parentPath = process.env.FILE_UPLOAD_PATH
        const path = `${parentPath}/${file.name}`
        await writeFile(path, buffer)
        console.log(`open ${path} to see the uploaded file`)
        return NextResponse.json({ success: true, data: path })
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}