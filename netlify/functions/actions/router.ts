import express, { Request, Response } from 'express';
import connectToDb from '../../../src/db';
import getActionsModel from './EntryModel';
import multer from 'multer';

const upload = multer();

const router = express.Router();

const uploadFile = async (req: Request, res: Response, fileData: string) => {
	try {
		await connectToDb();

		const MongooseModelActions = await getActionsModel();

		if (!MongooseModelActions) {
			console.error('Error getting MongooseModelActions');
			res.status(500).json({ error: 'Internal Server Error' });
			return;
		}

		const actionResult = await MongooseModelActions.create({ text: fileData });

		res.status(200).json(actionResult);
	} catch (error) {
		console.error('Error uploading file', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
	try {
		console.log('req.file', req.file);
		const file = req.file;
		const fileData = file.buffer.toString('utf8');
		const type = file.mimetype;

		if (!fileData || !type || type !== 'text/markdown') {
			res.status(400).json({ error: 'Bad Request' });
		} else {
			uploadFile(req, res, fileData);
		}
	} catch (error) {
		console.error('Error uploading file', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

const incrementAction = async (req: Request, res: Response, action: string, url: string) => {
	console.log('incrementAction', action, url);
	try {
		await connectToDb();

		const MongooseModelActions = await getActionsModel();

		if (!MongooseModelActions) {
			console.error('Error getting MongooseModelActions');
			res.status(500).json({ error: 'Internal Server Error' });
			return;
		}

		const actionResult = await MongooseModelActions.findOneAndUpdate({ url }, { $inc: { [action]: 1 } }, { new: true, upsert: true });

		res.status(200).json(actionResult);
	} catch (error) {
		console.error('Error incrementing action', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

router.get('/', (req: Request, res: Response) => {
	console.log('Hello from Express.js!');
	res.status(200).json({ message: 'Hello from Express.js!' });
});

router.get('/like', async (req: Request, res: Response) => {
	try {
		const url = 'localhost:8888';

		if (!url) {
			res.status(400).json({ error: 'Bad Request' });
		} else {
			await incrementAction(req, res, url, 'like');
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default router;
