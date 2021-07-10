import withFirestore from '@/middlewares/withFirestore';

const handler = async (req, res) => {
  try {
    const {
      query: { id },
      body,
      method,
      firestore,
    } = req;

    switch (method) {
      case 'GET': {
        const doc = await firestore.collection('users').doc(id).get();

        if (!doc.exists) {
          res.status(404).json({ result: 'User Not Found' });
          return;
        }

        res.status(200).json({ result: doc.data() });
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
