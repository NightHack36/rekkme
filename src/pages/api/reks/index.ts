import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getErrorStatusCode } from '../helper';
import { deleteOneObject, getAllObjects, insertOneObject } from '../prisma';

const collectionName = 'reks';
const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allReks = await getAllObjects(collectionName);
    res.status(200).json({ success: true, reks: allReks });
  } catch (error) {
    const errorObj = error as Error;
    res.status(500).json({ success: false, message: errorObj.message });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body.newObject) {
      const newRekObject = req.body.newObject;
      insertOneObject(collectionName, newRekObject);
      res.status(200).json({ success: true });
    } else {
      throw new Error('400');
    }
  } catch (error) {
    const errorObj = error as Error;
    const statusCode = getErrorStatusCode(errorObj.message);
    res.status(statusCode).json({ success: false, message: errorObj.message });
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.query.id) {
      const deleteId = req.body.id;
      deleteOneObject(collectionName, { id: deleteId });
      res.status(200).json({ success: true });
    } else {
      throw new Error('400');
    }
  } catch (error) {
    const errorObj = error as Error;
    const statusCode = getErrorStatusCode(errorObj.message);
    res.status(statusCode).json({ success: false, message: errorObj.message });
  }
});

export default handler;
