import { Model, Schema, model, models } from 'mongoose';

export interface IEntry {
	url: string;
	like: number;
	share: number;
	subscribe: number;
}

const actionsSchema: Schema = new Schema<IEntry>({
	url: {
		type: String,
		required: true,
		unique: true,
	},
	like: {
		type: Number,
		default: 0,
	},
	share: {
		type: Number,
		default: 0,
	},
	subscribe: {
		type: Number,
		default: 0,
	},
});

const getActionsModel = async () => {
	let entryModel: Model<IEntry>;
	try {
		if (!models.Entry) {
			entryModel = model<IEntry>('Entry', actionsSchema);
		} else {
			entryModel = model<IEntry>('Entry');
		}
		return entryModel;
	} catch (error) {
		console.error('Error getting Entry model', error);
	}
};

export default getActionsModel;
