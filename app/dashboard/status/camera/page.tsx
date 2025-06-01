export const dynamic = "force-dynamic";

import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Badge, Box, Callout, Flex, Heading, Table, Text } from '@radix-ui/themes';
import { prisma } from "@/lib/prisma";
import React from 'react';

const CameraPage = async () => {
  const status = await prisma.esp_status.findFirst({
    orderBy: { last_taken: 'desc' },
  });

  // Fetch event history
  const events = await prisma.history.findMany({
    orderBy: { timestamp: 'desc' },
    take: 10, // Limit to latest 10 records
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
          <Flex direction="column" gapY="5">
            <Heading>
              Status Kamera
            </Heading>

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

            <Heading>Riwayat Status Kamera</Heading>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Tanggal</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {events.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={2}>Tidak ada riwayat yang tercatat</Table.Cell>
                  </Table.Row>
                ) : (
                  events.map((event: any) => (
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
                  ))
                )}
              </Table.Body>
            </Table.Root>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CameraPage;