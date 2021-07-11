import { useRouter } from 'next/router';
import nookies from 'nookies';
import { Box } from '@chakra-ui/react';
import Dashboard from '@/components/layouts/Dashboard';
import { domain } from '@config';
import withFirebaseAdmin from '@/middlewares/withFirebaseAdmin';

export default function Home() {
  const router = useRouter();
  const {
    query: { category },
  } = router;

  return (
    <Box w="100vw" minH="100vh">
      Hello {category}
    </Box>
  );
}

Home.Layout = Dashboard;

export const getServerSideProps = withFirebaseAdmin(async ctx => {
  try {
    const cookies = nookies.get(ctx);
    const token = cookies['loom-token'];

    const {
      req: { firebaseAdmin },
    } = ctx;

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
});
