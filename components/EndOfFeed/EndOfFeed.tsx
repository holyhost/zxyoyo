import { Center, Divider, Group, Stack, Text } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';

export function EndOfFeed() {
  return (
    <Stack mt="xl">
      <Divider
        size="sm"
        label={
          <Group>
            <IconClock size={16} stroke={1.5} />
            人家是有底线的哦
          </Group>
        }
        labelPosition="center"
      />
      <Center>
        <Stack align="center">
          <Text size="sm" color="dimmed">
            考虑换个姿势，或者换个关键词试试看吧
          </Text>
          <Text
            variant="link"
            size="sm"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            返 回 顶 部
          </Text>
        </Stack>
      </Center>
    </Stack>
  );
}
