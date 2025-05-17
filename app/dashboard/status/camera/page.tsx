export const dynamic = "force-dynamic";

import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Box, Callout, Flex, Heading, Text } from '@radix-ui/themes';
import { prisma } from "@/lib/prisma"; // Use the singleton Prisma client
import React from 'react';

const CameraPage = async () => {
  const status = await prisma.esp_status.findFirst({
    orderBy: { last_taken: 'desc' },
  });

  if (!status) {
    return (
      <Box p="5">
        <Flex align="center" justify="center">
          <Heading>Tidak ada data yang tersedia</Heading>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p="5">
      <Flex align="center" justify="center">
        <Box width="60vw" height="60vh">
          <Flex direction="column" gapY="2">
            <Heading>
              Gambar Terakhir
            </Heading>

            <img width="60%" src={status.last_picture} alt="Last captured" />

            {status.fire ? (
              <Callout.Root color="red">
                <Callout.Icon>
                  <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                  Terdeteksi Kebakaran
                </Callout.Text>
              </Callout.Root>
            ) : (
              <Callout.Root color="green">
                <Callout.Icon>
                  <CheckCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Tidak Terdeteksi Kebakaran
                </Callout.Text>
              </Callout.Root>
            )}

            <Text>
              Terakhir dikirim {new Date(status.last_taken).toLocaleString('id-ID')}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CameraPage;