import { ActionIcon, Badge, Card, Group, Text, Image, Menu, rem, Pill } from "@mantine/core"
import classes from './OtherImageCard.module.css';
import { OtherImageBean } from "@/bean/OtherImageBean";
import { IconTrash, IconDotsVertical, IconDownload, IconClock, IconFileUpload, IconBrandWechat, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

const OtherImageCard = ({ index, data, width, upload,update, onDelete}: Props) => {
  // const isSucai = data.mark.includes('xx,xx')
  // const [deleted, setDeleted] = useState(false)
  const deleteImage = async(onlysucai?: boolean, onlyfile?:boolean)=>{
    onDelete && onDelete(data, onlysucai, onlyfile)
  }
  const uploadSucai = async () => {
    upload && upload(data.id)
  }

  return (

    <Card withBorder padding="lg" mt="xs" radius="md" maw="20rem" miw="10rem">

      <Card.Section>
        <Image src={data.spath ? (data.spath):'/noimg.png'}></Image>
        <Group className={classes.floatingMenu} justify="flex-end" mt="0" mb="0">
          {/* <Text fw={500}>{data.type}</Text> */}
          {data.type && <Badge color="pink" variant="light">
            {data.type}
          </Badge>}
          {data.mark && <Link href={data.mark.split('xx,xx')[1]} target="_blank">
            <IconBrandWechat color="green" size={'16'}/>  
          </Link>}
          <Menu trigger="hover" withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component="a" 
                href={data.bpath} 
                rel="noopener noreferrer" 
                download 
                leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                下载原图
              </Menu.Item>
              {!data.mark&& <Menu.Item onClick={uploadSucai} leftSection={<IconFileUpload style={{ width: rem(14), height: rem(14) }} />}>
                上传素材
              </Menu.Item>}
              <Menu.Item leftSection={<IconClock style={{ width: rem(14), height: rem(14) }} />}>
                {data.createtime}
              </Menu.Item>
              {data.mark && <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={()=> deleteImage(true)}
              >
                删除素材
              </Menu.Item>}
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={()=> deleteImage(false,true)}
              >
                删除文件
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={()=> deleteImage()}
              >
                删除存档(all)
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <div className={classes.floatingTags}>
          <Group gap={'2px'}>
            <ActionIcon onClick={()=> update && update('tag')} variant="transparent" c={'teal'} size="lg" aria-label="add tags"><IconPlus/></ActionIcon>
            {data.tag && data.tag.split(',').map((tag, index) => <Pill key={index}>{tag}</Pill>)}
          </Group>
              
        </div>
      </Card.Section>
      {/* {deleted && <IconTrash className={classes.floatingCenter} color="teal" size={'40px'}/>} */}

    </Card>
  )
}

export default OtherImageCard

type Props = {
  index?: number,
  data: OtherImageBean,
  width?: number,
  upload?: (id: number)=> void,
  update?: (type: string)=> void,
  onDelete?: (data: OtherImageBean,onlysucai?: boolean, onlyfile?:boolean)=> void
}
