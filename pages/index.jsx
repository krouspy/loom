import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthUserContext';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('user', user);
    // console.log('token', user?.getIdToken());
    if (!loading && !user) {
      router.push('sign-in');
    }
  }, [user, loading]);

  return (
    <Box w="100vw" minH="100vh">
      <Dashboard>Hello</Dashboard>
    </Box>
  );
}
