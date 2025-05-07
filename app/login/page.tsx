'use client';

import { EnterIcon, PersonIcon, LockClosedIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Heading, Strong, TextField } from '@radix-ui/themes'
import React from 'react'
const LoginPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box width="360px">
        <Card size="4">
          <Flex direction="column" gap="5">
            <Heading>
              Masuk PeduliHijau
            </Heading>

            <div>
              <Strong>Email</Strong>
              <TextField.Root placeholder='Masukkan email anda'>
                <TextField.Slot>
                  <PersonIcon></PersonIcon>
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div>
              <Flex justify="between">
                <Strong>Password</Strong>
              </Flex>
              <TextField.Root placeholder='Masukkan password anda' >
                <TextField.Slot>
                  <LockClosedIcon/>
                </TextField.Slot>
              </TextField.Root>
            </div>

            <Flex gap="2" direction="row-reverse">
              <Button><EnterIcon/>Masuk</Button>
              <Button variant="outline"><Pencil2Icon/>Daftar</Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Flex>
  )
}

export default LoginPage
