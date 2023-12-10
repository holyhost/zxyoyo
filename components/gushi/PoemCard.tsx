"use client"
import { PoemBean } from "@/bean/PoemBean"
import { Badge, Card, Image, Text, Group, Avatar, Center } from "@mantine/core"
import classes from './poem.module.css';

const PoemCard = ({ index, data, width }: Props) => {
  return (
    <Card shadow="md" withBorder padding="sm" mt="xs" radius="md" maw="20rem" miw="10rem">

      <Badge className={classes.dynasty} component="a" href={`/gushi/shiren/${data.pt_id}`}>
        {data.pt_name}
      </Badge>
      <Center>
        <Text fw={700} mt={'md'} component="a" href={`/gushi/${data.id}`}>{data.title}</Text>
      </Center>
      
      {/* <Group mt="sm">
        <Avatar src={''} radius="sm" />
        <div>
          
          <Text fw={500}>
            {data.pt_name}
          </Text>
        </div>
      </Group> */}
      {data.shiju.split("\n").map((item: string,index) => <Center  key={data.id + '' + index} mt='xs'>
        <Text fz="md" c="dimmed">
          {item}
        </Text>
      </Center>)}

    </Card>
  )
}

export default PoemCard

type Props = {
  index: number,
  data: PoemBean,
  width: number
}
