import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

const backHost = process.env.BACKEND_HOST
// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function GET(request: NextRequest) {

    const result = await fetch(backHost + "/api/v1/gsc/poem",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ 'name': "李白" })
        }
    )
    const data = await result.json()


    return NextResponse.json({ data,revalidated: true, now: Date.now() })
}

