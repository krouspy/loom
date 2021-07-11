import admin from '@/firebase/firebase-admin';

const withFirebase = handler => {
  return async (ctx, ...rest) => {
    ctx.firebase = {
      admin,
      firestore: admin.firestore(),
    };
    return handler(ctx, ...rest);
  };
};

export default withFirebase;
