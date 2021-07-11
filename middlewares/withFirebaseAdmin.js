import admin from '@/firebase/firebase-admin';

const withFirebaseAdmin = handler => {
  return async ctx => {
    ctx.req.firebaseAdmin = admin;
    return handler(ctx);
  };
};

export default withFirebaseAdmin;
