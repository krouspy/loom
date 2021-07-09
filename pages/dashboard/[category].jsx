import { useRouter } from 'next/router';
import nookies from 'nookies';
import { Box } from '@chakra-ui/react';
import Dashboard from '@/components/Dashboard';
import firebaseAdmin from '@/lib/firebase-admin';
import { domain } from '@config';

export default function Home({ user }) {
  const router = useRouter();
  const {
    query: { category },
  } = router;

  return (
    <Box w="100vw" minH="100vh">
      <Dashboard user={user}>Hello {category}</Dashboard>
    </Box>
  );
}

export const getServerSideProps = async ctx => {
  try {
    const cookies = nookies.get(ctx);
    const token = cookies['loom-token'];
    const { uid } = await firebaseAdmin.auth().verifyIdToken(token);

    const uri = `${domain}/api/users/${uid}`;
    const res = await fetch(uri);
    const { result } = await res.json();

    if (!result) {
      return {
        redirect: {
          permanent: false,
          destination: '/sign-in',
        },
      };
    }

    return {
      props: { user: result },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in',
      },
    };
  }
};
