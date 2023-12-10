import { PoemBean } from "@/bean/PoemBean"
import { Badge, Card, Image, Text, Group, Avatar, Center } from "@mantine/core"
import classes from './poem.module.css';

const PoemDetail = ({pt_name, id, title, pt_id, shiju}: PoemBean) => {
  return (
    <Card shadow="xl" withBorder padding="sm" mt="xs" radius="md" maw="50rem" miw="10rem">

      <Badge className={classes.dynasty} component="a" href={`/gushi/shiren/${pt_id}`}>
        {pt_name}
      </Badge>
      <Center>
        <Text fw={700} mt={'md'}>{title}</Text>
      </Center>
      
      {/* <Group mt="sm">
        <Avatar src={''} radius="sm" />
        <div>
          
          <Text fw={500}>
            {data.pt_name}
          </Text>
        </div>
      </Group> */}
      {shiju.split("\n").map((item: string,index: number) => <Center  key={id + '' + index} mt='xs'>
        <Text fz="md" c="dimmed">
          {item}
        </Text>
      </Center>)}

    </Card>
  )
}

export default PoemDetail

