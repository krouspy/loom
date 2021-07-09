import admin from '@/lib/firebase-admin';

const db = admin.firestore();

const handler = async (req, res) => {
  try {
    const { body, method } = req;

    switch (method) {
      case 'GET': {
        const locations = await db.collection('locations').get();

        const result = [];
        locations.forEach(doc => {
          result.push({ id: doc.id, data: doc.data() });
        });

        res.status(200).json({ result });
        break;
      }
      case 'POST': {
        const { name, country, city, price } = body;
        await db.collection('locations').add({
          name,
          country,
          city,
          price,
        });
        res.status(200).json({ result: 'Success' });
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ result: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'Internal Server Error' });
  }
};

export default handler;
