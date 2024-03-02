import express, { Request, Response } from 'express';
import connectToDb from '../../../src/db';
import getActionsModel from './EntryModel';

const router = express.Router();

const incrementAction = async (req: Request, res: Response, action: string, url: string) => {
	await connectToDb();

	const MongooseModelActions = await getActionsModel();

	if (!MongooseModelActions) {
		res.status(500).json({ error: 'Internal Server Error' });
		return;
	}

	try {
		const actionResult = await MongooseModelActions.findOneAndUpdate({ url }, { $inc: { [action]: 1 } }, { new: true, upsert: true });

		res.status(200).json(actionResult);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello from Express.js!' });
});

router.get('/like', async (req: Request, res: Response) => {
  const url = req.query.url as string;

  if (!url) {
    res.status(400).json({ error: 'Bad Request' });
  } else {
    await incrementAction(req, res, 'like', url);
  }
});

export default router;