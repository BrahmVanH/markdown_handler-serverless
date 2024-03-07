import express, { Request, Response } from 'express';
import connectToDb from './mongo/db';
import getActionsModel from './EntryModel';
import multer, { Multer } from 'multer';

const storage = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });
// const uploadFile = upload.single('file');

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

router.post('/', upload.single('file'), async (req, res) => {
	console.log('uploading file');
	try {
		if (!req.file) {
			console.log('no req.file');
			res.status(400).json({ error: 'Bad Request' });
			return;
		}

		console.log('req.file', req.file);
		const file = req.file;
		const fileData = file.buffer.toString('utf8');
		console.log('fileData', fileData);
		const type = file.mimetype;

		if (!fileData || !type || type !== 'text/markdown') {
			console.log('no fileData or type');
			res.status(400).json({ error: 'Bad Request' });
		} else {
			uploadFile(req, res, fileData);
		}
	} catch (error) {
		console.error('Error uploading file', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// router.post('/', async (req, res) => {
// 	try {
// 		if (!req.body) {
// 			console.log('req.body', req.body);
// 			console.log('req.file', req.file);
// 			console.log('no req.body');
// 			res.status(400).json({ error: 'Bad Request no body' });
// 			return;
// 		}

// 		uploadFile(req, res, async (err: any) => {
// 			if (err) {
// 				console.error('Error uploading file', err);
// 				res.status(500).json({ error: 'Internal Server Error' });
// 				return;
// 			}

// 			if (!req.body) {
// 				res.status(400).json({ error: 'Bad Request no body' });
// 				return;
// 			}

// 			const file = req.body;
// 			const fileData = file.buffer.toString('utf8');
// 			const type = file.mimetype;

// 			if (!fileData || !type || type !== 'text/markdown') {
// 				res.status(400).json({ error: 'Bad Request not markdown' });
// 			} else {
// 				await connectToDb();

// 				const MongooseModelActions = await getActionsModel();

// 				if (!MongooseModelActions) {
// 					console.error('Error getting MongooseModelActions');
// 					res.status(500).json({ error: 'Internal Server Error' });
// 					return;
// 				}

// 				const actionResult = await MongooseModelActions.create({ text: fileData });

// 				res.status(200).json(actionResult);
// 			}
// 		});
// 	} catch (error) {
// 		console.error('Error uploading file', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// });

// router.post('/', (req: Request, res: Response) => {
// 	console.log('req.body', req.body);
// 	console.log('it at least got into the test route');
// 	res.writeHead(200, { 'Content-Type': 'text/html' });
// 	res.write('Hello, actions');
// 	res.end();
// 	console.log('testing post route');
// });

router.get('/', (req, res) => {
	console.log('it at least got into the test route');
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('Hello, actions');
	res.end();
});

export default router;
