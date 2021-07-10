import admin from '@/firebase/firebase-admin';

const withFirestore = handler => {
  return async (req, res) => {
    req.firestore = admin.firestore();
    return handler(req, res);
  };
};

export default withFirestore;
