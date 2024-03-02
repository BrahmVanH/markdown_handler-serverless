import { connect, set } from 'mongoose';

const connectToDb = async () => {
	const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/securitiesTracker';
	const DB_NAME = process.env.DB_NAME ?? '';

	console.log('connectToDb', MONGO_URI, DB_NAME);
	try {
		set('strictQuery', true);
		await connect(MONGO_URI).then(() => console.log('Connected to MongoDB'));
	} catch (error) {
		console.error('Error connecting to MongoDB', error);
		throw new Error('Error connecting to MongoDB');
	}
};

connectToDb();

export default connectToDb;
