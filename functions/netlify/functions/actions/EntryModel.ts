import { Model, Schema, model, models } from 'mongoose';

export interface IEntry {
	date: Date;
	text: string;
}

const actionsSchema: Schema = new Schema<IEntry>({
	date: {
		type: Date,
		default: Date.now,
	},
	text: {
		type: String,
		required: true,
		unique: true,
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
