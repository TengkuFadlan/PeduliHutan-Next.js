export const dynamic = "force-dynamic";

import { Box, Flex, Heading, Progress, Table } from '@radix-ui/themes';
import { prisma } from "@/lib/prisma"; // Import the Prisma singleton client
import React from 'react';

const BatteryPage = async () => {
  // Fetch the latest battery level data from the database
  const status = await prisma.esp_status.findFirst({
    orderBy: { last_taken: 'desc' }, // Get the latest record
  });

  if (!status) {
    return (
      <Box p="5">
        <Flex align="center" justify="center">
          <Heading>No data available</Heading>
        </Flex>
      </Box>
    );
  }

  const batteryPercentage = Math.min(Math.max(status.battery, 0), 100); // Ensure value is between 0 and 100

  return (
    <Box p="5">
      <Flex align="center" justify="center">
        <Box width="60vw" height="60vh">
          <Heading>
            Status Baterai
          </Heading>

          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Persentase Baterai</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Level Baterai</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>ESP32CAM</Table.RowHeaderCell>
                <Table.Cell>{batteryPercentage}%</Table.Cell>
                <Table.Cell>
                  <Progress color="green" value={batteryPercentage} size="3" />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default BatteryPage;