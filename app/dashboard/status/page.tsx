import { Badge, Box, Card, Flex, Grid, Heading, Progress, Separator } from '@radix-ui/themes'
import React from 'react'

const DashboardStatusPage = () => {
  return (
    <Box p="5">
      <Flex direction="column" align="center" justify="center" gap="3">

        <Box width="50vw">
          <Card>
            <Heading>
              Gambar Terakhir
            </Heading>
            <Separator my="1" size="4" />
            <img width="100%" src="https://wallpaperaccess.com/full/1371397.jpg"></img>
          </Card>
        </Box>


        <Grid columns="2" gap="3">
          <Card size="2">
            <Heading>
              Status Hutan
            </Heading>
            <Separator my="1" size="4" />
            <Badge color="green" size="3">Aman</Badge>
          </Card>

          <Card size="2">
            <Heading>
              Status Baterai
            </Heading>
            <Separator my="1" size="4" />
            <Progress value={75} size="3" color="green" />
          </Card>

          <Card size="2">
            <Heading>
              Status Air
            </Heading>
            <Separator my="1" size="4" />
            <Progress value={90} size="3" color="blue" />
          </Card>
        </Grid>
      </Flex>
    </Box>
  )
}

export default DashboardStatusPage