export const dynamic = "force-dynamic";

import { Box, Flex, Heading, Progress, Table } from '@radix-ui/themes';
import { prisma } from "@/lib/prisma";
import React from 'react';

const WaterPage = async () => {
  // Fetch the latest water level data from the database
  const status = await prisma.esp_status.findFirst({
    orderBy: { last_taken: 'desc' },
  });

  // Fetch water history
  const waterHistory = await prisma.water_history.findMany({
    orderBy: { timestamp: 'desc' },
    take: 10, // Limit to latest 10 records, adjust as needed
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

  const waterPercentage = Math.min(Math.max(status.water_level, 0), 100);

  return (
    <Box p="5">
      <Flex align="center" justify="center">
        <Box width="60vw" height="60vh">
          <Flex direction="column" gapY="5">
            <div>
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
            </div>

            <div>
              <Heading>Riwayat Status Air</Heading>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Tanggal</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Persentase Air</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Level Air</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {waterHistory.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={3}>Tidak ada riwayat</Table.Cell>
                    </Table.Row>
                  ) : (
                    waterHistory.map((entry: any) => (
                      <Table.Row key={entry.id}>
                        <Table.RowHeaderCell>
                          {new Date(entry.timestamp).toLocaleString('id-ID')}
                        </Table.RowHeaderCell>
                        <Table.Cell>{entry.water_level}%</Table.Cell>
                        <Table.Cell>
                          <Progress color="cyan" value={entry.water_level} size="3" />
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table.Root>
            </div>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default WaterPage;