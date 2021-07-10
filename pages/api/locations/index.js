import withFirestore from '@/middlewares/withFirestore';

const handler = async (req, res) => {
  try {
    const { body, method, firestore } = req;

    switch (method) {
      case 'GET': {
        const locations = await firestore.collection('locations').get();

        const result = [];
        locations.forEach(doc => {
          result.push({ id: doc.id, data: doc.data() });
        });

        res.status(200).json({ result });
        break;
      }
      case 'POST': {
        const { name, country, city, price } = body;
        await firestore.collection('locations').add({
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

export default withFirestore(handler);
