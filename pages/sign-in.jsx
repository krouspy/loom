import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import nookies from 'nookies';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useAuth } from '@/context/AuthUserContext';
import firebaseAdmin from '@/lib/firebase-admin';

export default function SignIn() {
  const router = useRouter();
  const { user, loading, signInWithEmailAndPassword } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading]);

  const formik = useFormik({
    initialValues: {
      email: 'john.doe@gmail.com',
      password: 'password',
    },
    onSubmit: async ({ email, password }) => {
      try {
        await signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" minW="md" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in</Heading>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={formik.handleChange} value={formik.values.email} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>
              <Stack spacing={3}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                  pb="5"
                >
                  <Checkbox>Remember me</Checkbox>
                  <NextLink href="/">
                    <Link color="blue.400">Forgot password?</Link>
                  </NextLink>
                </Stack>
                <Button
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
                <Text fontSize="sm" textAlign="right">
                  Not a member yet?
                  <NextLink href="/sign-up">
                    <Link color="blue.400" ml="1">
                      Sign up
                    </Link>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export const getServerSideProps = async ctx => {
  try {
    const cookies = nookies.get(ctx);
    const token = cookies['loom-token'];

    await firebaseAdmin.auth().verifyIdToken(token);

    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
