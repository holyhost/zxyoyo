import { Title, Text, Anchor, Divider } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" pt={100}>
        欢迎来到{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          只想优优
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        ---我们来来回回反反复复，最终还是为了找回小时候一个人哪怕只是玩玩泥巴还能够的那份沉静和认真劲
      </Text>
      
      <Anchor href='/home'>
        <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
          中华文化五千年，煌煌巨著随处见，春秋战国有孔孟，百花争鸣巨人间，汉赋唐诗广流传，宋词元曲非等闲，明清小说人知晓，现代文艺领风骚!
        </Text>
      </Anchor>
      <div style={{textAlign: 'center'}}>
        ---------------
      </div>

    </>
  );
}
