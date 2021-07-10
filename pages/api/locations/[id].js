import admin from '@/firebase/firebase-admin';

const db = admin.firestore();

const handler = async (req, res) => {
  try {
    const {
      query: { id },
      body,
      method,
    } = req;

    switch (method) {
      case 'GET': {
        const doc = await db.collection('locations').doc(id).get();

        if (!doc.exists) {
          res.status(404).json({ result: 'Location Not Found' });
          return;
        }

        res.status(200).json({ result: doc.data() });
        break;
      }
      case 'PUT': {
        await db.collection('locations').doc(id).update(body);
        res.status(200).json({ result: 'Success' });
        break;
      }
      case 'DELETE': {
        await db.collection('locations').doc(id).delete();
        res.status(200).json({ result: 'Success' });
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({ result: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'Internal Server Error' });
  }
};

export default handler;
