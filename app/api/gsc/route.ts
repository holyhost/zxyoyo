import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

const POET_NAMES = ['李白','杜甫','白居易','苏轼','苏洵','苏辙','陶渊明','柳宗元','欧阳修','王安石','曾巩','韩愈','李清照']
const backHost = process.env.BACKEND_HOST
// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function GET(request: NextRequest) {
    const result = await fetch(backHost + "/api/v1/gsc/get_poem_by_author",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ 'name': POET_NAMES[Math.floor(Math.random()*POET_NAMES.length)] })
        }
    )
    const data = await result.json()
    return NextResponse.json({ data,revalidated: true, now: Date.now() })
}

