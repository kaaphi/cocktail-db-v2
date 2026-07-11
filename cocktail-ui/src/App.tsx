import { AppShell, Burger, Group, MantineProvider, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router';
import { NavBar } from './Navbar';
import { theme } from './Theme';

export const headerHeight = 60

function App() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="md"
        header={{ height: headerHeight }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Title order={2} renderRoot={(props) => <Link to="/" {...props} />} style={{
              color: 'inherit',
              textDecoration: 'none',
            }} >Cocktail Compendium</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar><NavBar closeNavBar={close} /></AppShell.Navbar>

        <AppShell.Main><Outlet /></AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export default App
