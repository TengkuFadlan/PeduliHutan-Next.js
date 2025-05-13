'use client';

import { ExitIcon, SunIcon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, IconButton, Strong, TabNav, Text, Tooltip } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavBar = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/dashboard/status', label: 'Status' },
    { href: '/dashboard/history', label: 'Riwayat' },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        alert('Logout successful!');
      } else {
        alert('Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout.');
    }
  };

  return (
    <Card>
      <Box width="100%" height="5vh">
        <Flex justify="between" align="center">
          <Flex align="center" gapX="5">
            <Image width={40} height={40} src="/PeduliHutan.png" alt="Logo PeduliHutan" />

            <TabNav.Root justify="center">
              {tabs.map(({ href, label }) => {
                const isActive = pathname.startsWith(href);
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

          <Flex gapX="3">
            <Tooltip content="Ubah tema">
              <IconButton variant="outline">
                <SunIcon />
              </IconButton>
            </Tooltip>

            <Button size="2" onClick={handleLogout}>
              <ExitIcon />
              Keluar
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default NavBar;
