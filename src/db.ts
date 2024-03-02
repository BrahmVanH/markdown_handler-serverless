import { connect, set } from 'mongoose';

const connectToDb = async () => {
	const MONGO_URI = process.env.MONGO_URI ?? '';
	const DB_NAME = process.env.DB_NAME ?? '';

	try {
		set('strictQuery', true);
		connect(`${MONGO_URI}/${DB_NAME}`, {}).then(() => console.log('Connected to MongoDB'));
	} catch (error) {
		console.error('Error connecting to MongoDB', error);
		throw new Error('Error connecting to MongoDB');
	}
};

connectToDb();

export default connectToDb;
