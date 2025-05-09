'use client';

import { ExitIcon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Heading, Strong, TabNav, Text } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavBar = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/dashboard/status', label: 'Status' },
    { href: '/dashboard/activity', label: 'Aktifitas' },
    { href: '/dashboard/settings', label: 'Pengaturan' },
  ];

  return (
    <Box width="100vw" height="60px">
      <Card>
        <Flex justify="between" px="8" align="center">
          <Flex align="center" gapX="5">
            <Image width={40} height={40} src="/PeduliHutan.png" alt="Logo PeduliHutan"></Image>

            <TabNav.Root justify="center">
              {tabs.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <TabNav.Link
                    key={href}
                    asChild
                    active={isActive}
                  >
                    <Link href={href}>
                      {isActive ? <Strong>{label}</Strong> : <Text>{label}</Text>}
                    </Link>
                  </TabNav.Link>
                );
              })}
            </TabNav.Root>
          </Flex>

          <Button size="2">
            <ExitIcon></ExitIcon>
            Keluar
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default NavBar;
