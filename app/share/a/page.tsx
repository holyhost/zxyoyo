"use client"
import { AppLayout } from "@/components/layout/AppLayout";
import ShareTable from "@/components/Share/ShareTable";
import ShareTestDuration from "@/components/Share/ShareTestDuration";
import { Container, Group, LoadingOverlay } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


const DATE_TYPE = 'YYYYMMDD'
export default function SharePage() {
  const [shares, setShares] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const formatDate = dayjs(new Date()).format(DATE_TYPE)
  const [curDate, setCurDate] = useState<Date | null>(new Date());
  useEffect(()=> {
    // setLoading(true)
    const d = dayjs(curDate).format(DATE_TYPE)
    // getShares(d)
    // console.log('before return')
    loading && setLoading(false)

  },[curDate])


  const getShares = async(tradeDate: string, perChange=-100.1)=>{
    
    const res = await (await fetch(`/api/share?tradeDate=${tradeDate}&perChange=${perChange}`)).json()
    console.log(res)
    if(res && res.ok && res.res){
      setShares(res.res)
    }else{
      console.log('get share error...')
      
    }
    setLoading(false)
  }

  return (
    <AppLayout>
      <Container bg={'white'}>
        <Container>
          <ShareTestDuration/>
        </Container>
        {/* <Container>
          <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}/>
          <ShareTable data={shares}/>
        </Container> */}
        
      </Container>
    </AppLayout>
  );
}
