
import { Badge, Card, Text, Avatar, Center } from "@mantine/core"
import classes from './poem.module.css';

const PoetCard = ({ id, name, dynasty, icon, intro, works, dbintro }: PoetProps) => {
  return (
    <Card shadow="xl" withBorder padding="sm" mt="xs" radius="md" maw="40rem" miw="10rem">

      <Badge className={classes.dynasty}>
        {dynasty}
      </Badge>
      <Center>
        <Text fw={700} mt={'md'}>{name}</Text>
      </Center>
      
      {/* <Group mt="sm">
        <Avatar src={''} radius="sm" />
        <div>
          
          <Text fw={500}>
            {data.pt_name}
          </Text>
        </div>
      </Group> */}
      <Text>
        {works}
      </Text>
      <Text>
        {intro}
      </Text>
      <Text>
        {dbintro}
      </Text>

    </Card>
  )
}

export default PoetCard

export type PoetProps = {
  id: number,
  name: string,
  dynasty: string,
  icon: string,
  intro: string,
  works: string,
  dbintro: string
}
