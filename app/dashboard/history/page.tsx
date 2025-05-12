import { Badge, Box, Flex, Heading, Table } from '@radix-ui/themes';
import { prisma } from "@/lib/prisma"; // Import the Prisma singleton client
import React from 'react';

const ActivityPage = async () => {
  // Fetch event history from the database
  const events = await prisma.history.findMany({
    orderBy: { timestamp: 'desc' }, // Order by most recent events
  });

  if (!events.length) {
    return (
      <Box p="9">
        <Flex align="center" justify="center">
          <Heading>Tidak ada riwayat yang tercatat</Heading>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p="9">
      <Flex align="center" justify="center">
        <Box width="60vw" height="60vh">
          <Heading>
            Riwayat
          </Heading>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Tanggal</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {events.map((event) => (
                <Table.Row key={event.id}>
                  <Table.RowHeaderCell>
                    {new Date(event.timestamp).toLocaleString('id-ID')}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Badge
                      color={event.fire ? "crimson" : "cyan"}
                      size="2"
                    >
                      {event.fire ? "Terdeteksi Kebakaran" : "Tidak Terdeteksi Kebakaran"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default ActivityPage;