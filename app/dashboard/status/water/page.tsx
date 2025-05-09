import { Box, Flex, Heading, Progress, Table } from '@radix-ui/themes'
import React from 'react'

const WaterPage = () => {
  return (
    <Box p="5">
      <Heading>
        Status Air
      </Heading>
      <Flex align="center" justify="center">
        <Box width="60vw" height="60vh">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Percentage</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Level</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>ESP32CAM</Table.RowHeaderCell>
                <Table.Cell>75%</Table.Cell>
                <Table.Cell>
                  <Progress color="cyan" value={75} size="3" />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Box>
  )
}

export default WaterPage