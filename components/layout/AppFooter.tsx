import {
  Button,
  ButtonProps,
  Group,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
const buttonProps: ButtonProps = {
  size: 'xs',
  variant: 'subtle',
  color: 'gray',
};

const hash = "zxyoyo_123456";

export function AppFooter() {
  const mobile = useIsMobile();
  return (
      <Group gap={'md'} wrap={'nowrap' }>
        <Text
          fw={700}
          style={{ whiteSpace: 'nowrap', userSelect: 'none' }}
          onDoubleClick={() => {
            
          }}
        >
          &nbsp; &copy; ZXYOYO {new Date().getFullYear()}
        </Text>

        <Group wrap={'nowrap'}>
          <Button
            component={Link}
            href="/pricing"
            {...buttonProps}
            variant="subtle"
            color="pink"
            px={mobile ? 5 : 'xs'}
          >
            Support Us ❤️
          </Button>
          <Button
            component={Link}
            href="/content/careers"
            {...buttonProps}
            variant="subtle"
            color="green"
            px={mobile ? 5 : 'xs'}
          >
            Join Us 💼
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/content/tos"
            {...buttonProps}
            px={mobile ? 5 : 'xs'}
          >
            Terms of Service
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/content/privacy"
            {...buttonProps}
            px={mobile ? 5 : 'xs'}
          >
            Privacy
          </Button>
          <Button component="a" href="https://github.com/holyhost/next-mantine" {...buttonProps} target="_blank">
            GitHub
          </Button>

          <Button
            component="a"
            href="/github/wiki/REST-API-Reference"
            {...buttonProps}
            target="_blank"
          >
            API
          </Button>
          <Button component="a" href="https://status.zxyoyo.com" {...buttonProps} target="_blank">
            Status
          </Button>
        </Group>
        <Group ml="auto" gap={4} wrap={'nowrap' }>
          <Button component="a" href="/bugs" {...buttonProps} target="_blank" pl={4} pr="xs">
            🪲 Bugs
          </Button>
          <Button
            component="a"
            href="/feedback"
            variant="light"
            color="yellow"
            target="_blank"
            pl={4}
            pr="xs"
          >
            💡 Ideas
          </Button>
        </Group>
      </Group>
  );
}
