import { Box, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image';
import React from 'react'

const CameraPage = () => {
  return (
    <Box p="5">
      <Heading>
        Gambar Terakhir
      </Heading>

      <img width="60%" src="https://wallpapercave.com/wp/wp4940646.jpg"></img>

      <Text>
        Terakhir dikirim 12 April 2025, 17:56
      </Text>
    </Box>
  );
}

export default CameraPage