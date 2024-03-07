import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
// import router from './router';

dotenv.config();

const app = express();

const router = express.Router();

// interface IRequest extends Request {
// 	headers: {
// 		host?: string;
// 	};
// }

// const getAllowedOrigins = (req: IRequest, res: Response, next: NextFunction) => {
// 	console.log('getting allowed origins...');
// 	console.log('req.headers', req.headers);
// 	const allowedOrigins = ['localhost:8888', 'https://markdown-handler.netlify.app', 'markdown-handler.netlify.app',
// 	];
// 	const host = req.headers.host ?? '';
// 	console.log('host', host);

// 	if (allowedOrigins.includes(host)) {
// 		next();
// 	} else {
// 		res.status(405).send('Host not allowed');
// 	}
// };
// app.use(getAllowedOrigins);

router.get('/', (req, res) => {
  console.log('it at least got into the test route');
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('Hello, actions');
	res.end();
});

app.use('/.netlify/functions/actions', router);



const handler = serverless(app);

export { handler };
