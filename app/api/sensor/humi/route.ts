import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import SensorData from '@/models/sensor-data'


export const GET = async(request: NextRequest)=> {
    console.log('posts come into get')
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const maker = searchParams.get('maker')
    const temp = searchParams.get('temp')
    const humi = searchParams.get('humi')
    if(token != 'K123qwelolqwel--utnAB') return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    await connectToDB()
    await SensorData.create({
        serio: maker,
        name: maker,
        value: temp,
        value2: humi,
        createTime: new Date().getTime().toString()
    })
    return NextResponse.json({ success: true })
}