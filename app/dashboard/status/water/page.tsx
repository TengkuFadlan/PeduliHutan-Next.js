export const dynamic = "force-dynamic";

import { Box, Flex, Heading, Progress, Table } from '@radix-ui/themes';
import { prisma } from "@/lib/prisma"; // Import the Prisma singleton client
import React from 'react';

const WaterPage = async () => {
  // Fetch the latest water level data from the database
  const status = await prisma.esp_status.findFirst({
    orderBy: { last_taken: 'desc' }, // Get the latest record
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

  const waterPercentage = Math.min(Math.max(status.water_level, 0), 100); // Ensure value is between 0 and 100

  return (
    <Box p="5">
      <Flex align="center" justify="center">
        <Box width="60vw" height="60vh">
          <Heading>
            Status Air
          </Heading>

          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Persentase Air</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Level Air</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>Sumber Air</Table.RowHeaderCell>
                <Table.Cell>{waterPercentage}%</Table.Cell>
                <Table.Cell>
                  <Progress color="cyan" value={waterPercentage} size="3" />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default WaterPage;