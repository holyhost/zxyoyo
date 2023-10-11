import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/utils/database'
import LoginRecord from '@/models/login-record'
import { randomUUID } from 'crypto'
import { MD5 } from 'crypto-js'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/models/user'

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
// const secret = request.nextUrl.searchParams.get('secret')
// const tag = request.nextUrl.searchParams.get('tag')
// if (secret !== process.env.MY_SECRET_TOKEN) {
//   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
// }

// if (!tag) {
//   return NextResponse.json({ message: 'Missing tag param' }, { status: 400 })
// }

// revalidateTag(tag)
export const POST = async (request: NextRequest) => {
  const { username, password } = await request.json()
  const email = process.env.ADMIN_EMAIL
  const pwd = process.env.ADMIN_SECRET
  if (username === email && password === pwd) {
    await connectToDB()
    await LoginRecord.create({
      uid: email,
      token: pwd,
      ctime: Date.now().toString()
    })
    const userInfo = {
      uid: MD5(username + process.env.NEXTAUTH_SECRET).toString(),
      token: randomUUID().toString(),
      validation: 30,
      image: '/admin.png',
      username: '晴天小猪',
      email: username
    }
    return NextResponse.json({ message: "登录成功", now: Date.now(), ...userInfo })
  } else {
    await connectToDB()
    await LoginRecord.create({
      uid: username,
      token: password,
      ctime: Date.now().toString(),
      message: "Login failed"
    })
    return NextResponse.json({ message: '密码错误' }, { status: 401 })
  }

}


export const GET = async (request: NextRequest) => {
  console.log('come into user get ')
  const session = await getServerSession(authOptions)
  console.log('session',session)
  if (session && session.user && session.user.email) {
    //todo: if user is admin , get user info by param user's _id
    const userDetail = await User.findOne({email:session.user.email})
    if( userDetail && userDetail.email){
      return NextResponse.json({ success: true, data: userDetail })
    }else{
      return NextResponse.json({ message: 'no user info' }, { status: 403 })
    }
    
  } else {
    return NextResponse.json({ message: '请先登录' }, { status: 401 })
  }
}
