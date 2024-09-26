import FileBean from '@/models/file'
import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { unlinkSync } from 'fs'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if( !id || id.length < 10){
        return NextResponse.json({ success: false }, {status: 401})
    }
    const session = await getServerSession(authOptions)
    if (session && session.user && session.user._id) {
        const uid = session.user._id.toString()
        await connectToDB()
        // user can only delete self file
        await FileBean.findOneAndDelete({
            uid: uid,
            name: id
        })
        try {
            const parentPath = process.env.FILE_UPLOAD_PATH
            const path = `${parentPath}/${id}`
            unlinkSync(path)
            console.log(`file of [ ${id} ] was been deleted`)
        } catch (error) {
            console.log(error)
            console.log(`file of [ ${id} ] delete failed.`)
        }
        
        return NextResponse.json({ success: true})
    }else{
        return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    }

    
}