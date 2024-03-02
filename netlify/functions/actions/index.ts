import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

import router from './router.mjs';

dotenv.config();

const app = express();

app.use(function (req: Request, res: Response, next) {
	console.log('req.headers', req.headers);
	const allowedOrigins = ['http://localhost:8888', 'https://markdown-handler.netlify.app'];
	const host = req.headers.host;
	console.log('host', host);

	if (allowedOrigins.includes(host)) {
		next();
	} else {
		res.status(405).send('Host not allowed');
	}
});

app.use('/.netlify/functions/actions', router);

const handler = serverless(app);
export default handler;
