import withFirestore from '@/middlewares/withFirestore';

const handler = async (req, res) => {
  try {
    const { body, method, firestore } = req;

    switch (method) {
      case 'GET': {
        const users = await firestore.collection('users').get();

        const result = [];
        users.forEach(doc => {
          result.push({ id: doc.id, data: doc.data() });
        });

        res.status(200).json({ result });
        break;
      }
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ result: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'Internal Server Error' });
  }
};

export default withFirestore(handler);
