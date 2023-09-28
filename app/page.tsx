import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Button, Group } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Group justify="center" mt="xl">
        <Button component='a' href='/home' variant="filled">home</Button>
      </Group>
    </>
  );
}
