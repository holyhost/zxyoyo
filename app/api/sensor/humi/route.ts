import { connectToDB } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import SensorData from '@/models/sensor-data'


export const GET = async(request: NextRequest)=> {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const maker = searchParams.get('maker')
    const temp = searchParams.get('temp')
    const humi = searchParams.get('humi')
    const st = process.env.SENSOR_TOKEN
    if(token != st) return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
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

export const POST = async(request: NextRequest)=> {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const stime = searchParams.get('stime')
    const etime = searchParams.get('etime')
    const name = searchParams.get('name')
    const st = process.env.SENSOR_TOKEN
    if(token != st) return NextResponse.json({ success: false, data: 'login pls' }, {status: 401})
    await connectToDB()
    const data = await SensorData.find({name, createTime: { $elemMatch: { $gte: stime, $lte: etime}}})
    if( data){
        return NextResponse.json({ success: true, data })
    }        
    
    return NextResponse.json({ success: false },{ status: 501})
}