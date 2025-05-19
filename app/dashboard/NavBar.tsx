'use client';

import { ExitIcon, SunIcon } from '@radix-ui/react-icons';
import { AlertDialog, Box, Button, Card, Flex, IconButton, Strong, TabNav, Text, Tooltip } from '@radix-ui/themes';
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
        window.location.href = "/login";
      } else {
        alert('Keluar gagal');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error terjadi saat keluar');
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
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button size="2">
                  <ExitIcon />
                  Keluar
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Keluar</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Batal
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red" onClick={handleLogout}>
                      Pretty Sure
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default NavBar;