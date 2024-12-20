"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Group, Stack, Table, Text } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';


const defaultTableConfig = {
    ts_code: '代码',
    name: '名称',
    pct_chg: '涨幅(%)',
    open: '开',
    close: '关',
    high: '高',
    low: '低',
    amount: '量(万)',
}

type sortType = 1 | 2 | 3

const ShareTable = ({ data, title, config }: { data: any[], title?: string, config?: any }) => {
    const tableConfig = config || defaultTableConfig
    const [sot, setSort] = useState(2)
    const [tableData, setTableData] = useState<any[]>([...data])
    const keys = Object.keys(tableConfig).filter(k => k !== 'name')
    useEffect(() => {
        if (sot != 2) {
            const arr = data.sort((a, b) => (2 - sot) * (a.pct_chg - b.pct_chg))
            setTableData([...arr])
        } else {
            setTableData([...data])
        }
    }, [data])
    const updateSortValue = (v: sortType) => {
        if (sot == v) {
            setSort(2)
            setTableData([...data])
        } else {
            const arr = data.sort((a, b) => (2 - v) * (a.pct_chg - b.pct_chg))
            setTableData([...arr])
            setSort(v)

        }
    }
    const headers = keys.map(k => <Table.Th key={k}>{tableConfig[k]}</Table.Th>)
    return (
        <Stack>
            <Text>{title || '结果'}</Text>
            <Group>
                <Text>排序(涨幅百分比)</Text>
                <IconSortAscending color={sot === 1 ? 'teal' : 'gray'} onClick={() => updateSortValue(1)} />
                <IconSortDescending color={sot === 3 ? 'teal' : 'gray'} onClick={() => updateSortValue(3)} />
            </Group>
            <Table.ScrollContainer minWidth={500}>
                <Table striped >
                    <Table.Thead style={{position: 'sticky'}}>
                        <Table.Tr>
                            {headers}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{tableData.map((element, index) => (
                        <Table.Tr key={element.ts_code + index}>
                            {keys.map(k => k === 'ts_code' ? <Table.Td key={k}>
                                <div>{element.name}</div>
                                <div style={{ fontSize: '12px', color: 'gray' }}>{element[k]}</div>
                            </Table.Td> : <Table.Td key={k}>{element[k]}</Table.Td>)}
                        </Table.Tr>
                    ))}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Stack>
    )
}

export default ShareTable