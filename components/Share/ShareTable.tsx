"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Group, Stack, Table, Text } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';


const defaultTableConfig = {
        ts_code: '代码',
        name: '名称',
        open: '开',
        close: '关',
        high: '高',
        low: '低',
        pct_chg: '涨幅(%)',
        amount: '量',
}

type sortType = 1 | 2 | 3

const ShareTable = ({data, title, config}:{data: any[],title?: string, config?: any}) => {
    const tableConfig = config || defaultTableConfig
    const [sot, setSort] = useState(2)
    console.log(data)
    const tempArr: any[] = []
    data.forEach(item => tempArr.push(item))
    const [tableData, setTableData] = useState<any[]>([...data])
    
    // const [rows, setRows] = useState<any[]>([...data])
    setTimeout(() => {
        console.log(tableData)
    }, 2000);
    const keys = Object.keys(tableConfig)
    const rows = tableData.map((element, index) => (
        <Table.Tr key={element.ts_code + index}>
            {keys.map(k => <Table.Td key={k}>{element[k]}</Table.Td>)}

        </Table.Tr>
    ))
    const updateSortValue = (v: sortType)=>{
        if(sot == v){
            setSort(2)
            setTableData([...data])
        }else{
            setSort(v)
            const arr = tableData.sort((a,b)=> (2-v)*(a.pct_chg - b.pct_chg))
            setTableData([...arr])
        }
    }
    const headers = keys.map(k => <Table.Th key={k}>{tableConfig[k]}</Table.Th>)
    return (
        <Stack>
            <Text>{title || '结果'}</Text>
            <Group>
                <Text>排序(涨幅百分比)</Text>
                <IconSortAscending color={sot === 1? 'teal' : 'gray'} onClick={()=> updateSortValue(1)}/>
                <IconSortDescending color={sot === 3? 'teal' : 'gray'} onClick={()=> updateSortValue(3)}/>
            </Group>
            <Table striped >
                <Table.Thead>
                    <Table.Tr>
                        {headers}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Stack>
    )
}

export default ShareTable