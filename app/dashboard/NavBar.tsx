'use client';

import { Strong, TabNav, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavBar = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/dashboard/status', label: 'Status' },
    { href: '/dashboard/settings', label: 'Pengaturan' },
  ];

  return (
    <TabNav.Root justify="center" style={{ gap: '12px' }}>
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
  );
};

export default NavBar;
