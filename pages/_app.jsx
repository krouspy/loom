import { ChakraProvider } from '@chakra-ui/react';
import { AuthUserProvider } from '@/context/AuthUserContext';
import Default from '@/components/layouts/Default';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Default;
  return (
    <ChakraProvider>
      <AuthUserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
