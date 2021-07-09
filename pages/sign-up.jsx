import router from 'next/router';
import NextLink from 'next/link';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useAuth } from '@/context/AuthUserContext';
import { postRequest } from '@/utils/http-request';

export default function SignUp() {
  const { createUserWithEmailAndPassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
    },
    onSubmit: async ({ firstname, lastname, email, password, confirm }) => {
      try {
        if (password !== confirm) {
          throw new Error('passwords do not match');
        }

        const { user } = await createUserWithEmailAndPassword(email, password);

        const body = {
          uid: user.uid,
          email,
          firstname,
          lastname,
        };
        await postRequest('/api/sign-up', body);

        router.push('/dashboard');
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
          <Heading fontSize="4xl">Sign up</Heading>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <Stack direction="row" spacing={2}>
                <FormControl id="firstname">
                  <FormLabel>Firstname</FormLabel>
                  <Input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                </FormControl>
                <FormControl id="lastname">
                  <FormLabel>Lastname</FormLabel>
                  <Input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                </FormControl>
              </Stack>
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
              <FormControl id="confirm">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm}
                />
              </FormControl>
              <Stack spacing={3}>
                <Button
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
                <Text fontSize="sm" textAlign="right">
                  Already have an account?
                  <NextLink href="/sign-in">
                    <Link color="blue.400" ml="1">
                      Sign in
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
