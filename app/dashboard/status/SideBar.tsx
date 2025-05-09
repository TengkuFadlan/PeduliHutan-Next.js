'use client';

import { BlendingModeIcon, EyeOpenIcon, LightningBoltIcon } from '@radix-ui/react-icons'
import { Box, Card, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import React from 'react'

const SideBar = () => {
  return (
    <Card>
      <Box height="85vh">
        <Flex direction="column" gapY="5">
          <Tooltip content="Kamera">
            <IconButton variant="surface" size="3">
              <EyeOpenIcon />
            </IconButton>
          </Tooltip>

          <Tooltip content="Baterai">
            <IconButton variant="surface" size="3">
              <LightningBoltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip content="Air">
            <IconButton variant="surface" size="3">
              <BlendingModeIcon />
            </IconButton>
          </Tooltip>
        </Flex>
      </Box>
    </Card>
  )
}

export default SideBar