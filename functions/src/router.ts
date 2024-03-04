import express, { Request, Response } from 'express';
import connectToDb from './mongo/db';
import getActionsModel from './EntryModel';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Upload file content  as string to MongoDB collection object

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

// Upload route to handle file uploads, restrict to text/markdown files and pass to uploadFile function

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
	console.log('uploading file');
	try {
		if (!req.file) {
			res.status(400).json({ error: 'Bad Request' });
			return;
		}

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

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'test route' });
});

export default router;
