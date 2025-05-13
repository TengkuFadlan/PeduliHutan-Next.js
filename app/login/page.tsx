'use client';

import { useRouter } from 'next/navigation'; // Import useRouter
import { EnterIcon, PersonIcon, LockClosedIcon, Pencil2Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Box, Button, Callout, Card, Flex, Heading, Strong, TextField, Spinner } from '@radix-ui/themes'
import Image from 'next/image';
import React, { useState } from 'react'

const LoginPage = () => {
  const router = useRouter(); // Initialize useRouter

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true); // Set loading state for register
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard'); // Redirect to dashboard on success
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Error terjadi saat melakukan pendaftaran');
    } finally {
      setIsRegistering(false); // Reset loading state
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true); // Set loading state for login
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard'); // Redirect to dashboard on success
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error terjadi saat masuk.');
    } finally {
      setIsLoggingIn(false); // Reset loading state
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box width="360px">
        <Card size="4">
          <Flex direction="column" gap="4">
            <Heading>
              Selamat datang!
            </Heading>

            <Flex align="center" justify="center">
              <Image width={200} height={200} src="/LogoPeduliHutan.png" alt="Logo PeduliHutan"></Image>
            </Flex>

            {errorMessage !== '' && (
              <Callout.Root color="red">
                <Callout.Icon>
                  <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                  {errorMessage}
                </Callout.Text>
              </Callout.Root>
            )}

            <div>
              <Strong>Email</Strong>
              <TextField.Root variant="soft" placeholder='Masukkan email anda' value={email} onChange={(e) => setEmail(e.target.value)}>
                <TextField.Slot>
                  <PersonIcon></PersonIcon>
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div>
              <Flex justify="between">
                <Strong>Password</Strong>
              </Flex>
              <TextField.Root variant="soft" placeholder='Masukkan password anda' type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </div>

            <Flex gap="2" direction="row-reverse">
              <Button onClick={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? <Spinner /> : <EnterIcon />} Masuk
              </Button>
              <Button onClick={handleRegister} variant="outline" disabled={isRegistering}>
                {isRegistering ? <Spinner /> : <Pencil2Icon />} Daftar
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Flex>
  )
}

export default LoginPage;