import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('<h1>Hello from Express.js!</h1>');
	res.end();
});

router.get('/like', (req: Request, res: Response) => {
	res.status(200).json({ action: 'like' });
});

app.use('/.netlify/functions/actions', router);

export const handler = serverless(app);