import { createContext, useContext } from 'react';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  createUserWithEmailAndPassword: async () => {},
  signInWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
};

export const useAuth = () => useContext(authUserContext);
