'use client';

import { BlendingModeIcon, EyeOpenIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, IconButton, Tooltip } from '@radix-ui/themes';
import React from 'react';
import { useRouter } from 'next/navigation';

const SideBar = () => {
  const router = useRouter();

  return (
    <Card>
      <Box height="85vh">
        <Flex direction="column" gapY="4">
          <Tooltip content="Kamera">
            <IconButton
              variant="surface"
              size="3"
              onClick={() => router.push('/dashboard/status/camera')}
            >
              <EyeOpenIcon />
            </IconButton>
          </Tooltip>

          <Tooltip content="Baterai">
            <IconButton
              variant="surface"
              size="3"
              onClick={() => router.push('/dashboard/status/battery')}
            >
              <LightningBoltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip content="Air">
            <IconButton
              variant="surface"
              size="3"
              onClick={() => router.push('/dashboard/status/water')}
            >
              <BlendingModeIcon />
            </IconButton>
          </Tooltip>
        </Flex>
      </Box>
    </Card>
  );
};

export default SideBar;
