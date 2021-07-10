import admin from 'firebase-admin';
import databaseCredentials from '../database-credentials.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(databaseCredentials),
  });
}

export default admin;
