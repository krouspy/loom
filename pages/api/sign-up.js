import admin from '@/lib/firebase-admin';

const db = admin.firestore();

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ result: 'Method Not Allowed' });
    return;
  }

  try {
    const { uid, email, firstname, lastname } = req.body;
    await db.collection('users').doc(uid).set({
      email: email.toLowerCase(),
      firstname,
      lastname,
    });
    res.status(200).json({ result: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'Internal Server Error' });
  }
};

export default handler;
