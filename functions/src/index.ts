import express, { Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();

// const router = express.Router();

interface IRequest extends Request {
	headers: {
		host?: string;
	};
}

const getAllowedOrigins = (req: IRequest, res: Response, next: NextFunction) => {
	// console.log('req.headers', req.headers);
	const allowedOrigins = ['localhost:8888', 'https://markdown-handler.netlify.app'];
	const host = req.headers.host ?? '';
	// console.log('host', host);

	if (allowedOrigins.includes(host)) {
		next();
	} else {
		res.status(405).send('Host not allowed');
	}
};
app.use(getAllowedOrigins);

app.use('/.netlify/functions', router);

const handler = serverless(app);

export { handler };

// router.get('/', (req: Request, res: Response) => console.log('Hello from Express.js!'));
// app.use('api', router);
