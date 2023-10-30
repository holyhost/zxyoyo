"use client"
import { ActionIcon, Badge, Card, Group, Text, Image, Menu, rem } from "@mantine/core"
import classes from './OtherImageCard.module.css';
import { OtherImageBean } from "@/bean/OtherImageBean";
import { IconTrash, IconDotsVertical, IconDownload, IconClock, IconFileUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/store/user.store";

const OtherImageCard = ({ index, data, width }: Props) => {
  // const isSucai = data.mark.includes('xx,xx')
  const [deleted, setDeleted] = useState(false)
  const [hasSucai, setSucai] = useState(data.mark ? true : false)
  const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST
  const imgHost = backendHost + "/app"
  const curUser = useCurrentUser()
  const deleteImage = async(onlysucai = false)=>{
    const fd = new FormData()
    fd.set('keynames', curUser?.keynames ?? '')
    fd.set('ids', data.id + '')
    if(onlysucai){
      fd.set('sucai', 'onlysucai')
    }
    const result = await fetch(backendHost + "/filemng/api/file/delete",{
      method: 'POST',
      body: fd
    })
    const dd = await result.json()
    console.log(dd)
    if(dd.status === 'ok'){
      if(onlysucai){
        setSucai(false)
      }else{
        setDeleted(true)
      }
      
    }
  }
  const uploadSucai = async () => {
    console.log('click upload sucai')
    const fd = new FormData()
    fd.set('keynames', curUser?.keynames ?? '')
    fd.set('id', data.id + '')
    const result = await fetch("/api/file/other",{
      method: 'POST',
      body: fd
    })
    const dd = await result.json()
    console.log(dd)
  }

  useEffect(()=>{
    
  },[])
  return (

    <Card withBorder padding="lg" mt="xs" radius="md" maw="20rem" miw="10rem">

      <Card.Section className={deleted ? classes.filterGray : ''}>
        <Image src={imgHost + data.spath}></Image>
        <Group className={classes.floatingMenu} justify="flex-end" mt="0" mb="0">
          {/* <Text fw={500}>{data.type}</Text> */}
          {data.type && <Badge color="pink" variant="light">
            {data.type}
          </Badge>}
          <Menu trigger="hover" withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component="a" 
                href={imgHost +data.bpath} 
                rel="noopener noreferrer" 
                download 
                leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                下载原图
              </Menu.Item>
              {!hasSucai&& <Menu.Item onClick={uploadSucai} leftSection={<IconFileUpload style={{ width: rem(14), height: rem(14) }} />}>
                上传素材
              </Menu.Item>}
              <Menu.Item leftSection={<IconClock style={{ width: rem(14), height: rem(14) }} />}>
                {data.createtime}
              </Menu.Item>
              {hasSucai && <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={()=> deleteImage(true)}
              >
                删除素材
              </Menu.Item>}
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={()=> deleteImage()}
              >
                删除文件
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      {deleted && <IconTrash className={classes.floatingCenter} color="teal" size={'40px'}/>}

    </Card>
  )
}

export default OtherImageCard

type Props = {
  index: number,
  data: OtherImageBean,
  width: number
}
