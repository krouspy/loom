import { useState, useEffect } from 'react';
import nookies from 'nookies';
import firebase from '@/firebase/firebase';

const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    return firebase.auth().signOut().then(clear);
  };

  const authStateChanged = async user => {
    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const formattedUser = formatAuthUser(user);
    setUser(formattedUser);
    setLoading(false);
  };

  const idTokenChanged = async user => {
    if (!user) {
      nookies.set(undefined, 'loom-token', '', { path: '/' });
      return;
    }

    const token = await user.getIdToken();
    nookies.set(undefined, 'loom-token', token, { path: '/' });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(idTokenChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  };
}
