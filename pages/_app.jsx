import { ChakraProvider } from '@chakra-ui/react';
import { AuthUserProvider } from '@/context/AuthUserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
