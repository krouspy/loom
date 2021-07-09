import { useState, useEffect } from 'react';
import firebase from '@/lib/firebase';

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

  const authStateChanged = async authState => {
    if (!authState) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setUser(formattedUser);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return { user, loading, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
}
