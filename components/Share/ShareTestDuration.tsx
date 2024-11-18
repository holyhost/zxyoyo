"use client"
import React from 'react'
import { Button, Checkbox, Text, Group, LoadingOverlay } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getShareListInfo } from '@/utils/action/share.action';
import { getPercentChange, isMainBoard } from './Share.util';
import ShareTable from './ShareTable';

const DATE_TYPE = 'YYYYMMDD'
// 测试一段时间后，涨跌数有多少，比如说一年，年初到年末，有多少涨了。

const ShareTestDuration = () => {
    const [message, setMessage] = useState('')
    const [shares, setShares] = useState<any[]>([])
    const [shares2, setShares2] = useState<any[]>([])
    const [result, setResult] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [mainBoard, setMainBoard] = useState<boolean>(false)
    const formatDate = dayjs(new Date()).format(DATE_TYPE)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    // useEffect(() => {
    //     setLoading(true)
    //     const d = dayjs(endDate).format(DATE_TYPE)
    //     getShareListInfo(d)
    //     console.log('before return')
    //     loading && setLoading(false)

    // }, [startDate, endDate])
    const updateShares = async(dt: Date | null,updateDate: Function, func: Function)=> {
        console.log(dt)
        if(!dt) return
        updateDate(dt)
        setLoading(true)
        const result = await getShareListInfo(dayjs(dt).format(DATE_TYPE))
        if(result.ok && result.res){
            func(result.res)
        }else{
            console.log('updateShares error')
            updateDate(null)
        }
        setLoading(false)

    }
    const compareShares = ()=> {
        let allShares = [...shares]
        console.log(allShares.length, shares2.length)
        
        if(mainBoard){
            allShares = shares.filter(i => isMainBoard(i.ts_code))
        }
        const tempResult: any[] = []
        allShares.forEach(s => {
            const code = s.ts_code
            const open = s.open
            const s2 = shares2.find(item => item.ts_code === code)
            if(s2){
                const close = s2.close
                const pctChange = getPercentChange(open, close)
                // console.log(code, `开${open}, 收${close}, 变化${pctChange}`)
                tempResult.push({
                    ts_code: code,
                    name: s2.name,
                    open: s.open,
                    close: s2.close,
                    high: s2.high,
                    low: s.low,
                    amount: s2.amount,
                    pct_chg: pctChange
                })
            }else{
                console.log('there is no data, code = ' + code)
            }
            
        })
        console.log(tempResult)
        const s = tempResult.filter(s => s.pct_chg > 0)
        setMessage('总' + allShares.length + ' , ' + "涨个数：" + s.length + ', 占比：'+ (s.length/allShares.length*100).toFixed(2))
        console.log('总' + allShares.length + ' , ' + "涨个数：", s.length)
        setResult([...tempResult])
    }

    return (
        <div>
            ShareTestDuration
            <Group>
                <DateInput
                    value={startDate}
                    valueFormat="YYYYMMDD"
                    onChange={(d) => updateShares(d,setStartDate, setShares)}
                    label="开始日期"
                    placeholder="选择日期"
                />
                <DateInput
                    value={endDate}
                    valueFormat="YYYYMMDD"
                    onChange={(d) => updateShares(d, setEndDate,setShares2)}
                    label="结束日期"
                    placeholder="选择日期"
                />
            </Group>
            <Group mt={'10px'} justify='end'>
                <Checkbox
                    checked={mainBoard}
                    label="沪深主板"
                    onChange={(event) => setMainBoard(event.currentTarget.checked)}
                />
                <Button loading={loading} onClick={compareShares}>查询</Button>
            </Group>
            <Text mt={'10px'}>{message}</Text>

            {result && result.length ? <ShareTable data={result}/> : null}
        </div>
    )
}

export default ShareTestDuration