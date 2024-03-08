import React, { useEffect } from 'react';
import { sendForm, getEntries } from '../utils/API';
import { IEntry } from './types';
import { useForm, FieldValues } from 'react-hook-form';

const App: React.FC = () => {
	console.log(React);

	const [formInput, setFormInput] = React.useState<FieldValues | null>(null);
	const [entries, setEntries] = React.useState<IEntry[]>([]);

	const testGet = async () => {
		try {
			const response = await fetch('/.netlify/functions/actions');
			const data = await response.json();
			console.log('data', data);
		} catch (error) {
			console.error('error', error);
		}
	};

	useEffect(() => {
		testGet().catch((error) => console.error('error', error));
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const handleFetchEntries = async () => {
		try {
			const resEntries = await getEntries();
			if (resEntries) {
				setEntries(resEntries);
			}
		} catch (error) {
			console.error('error', error);
		}
	};

	const handleSendForm = async (formInput: FieldValues) => {
		try {
			if (!formInput.file) {
				throw new Error('file is required');
			}
			const file: File = formInput.file[0];
			console.log('file', file);
			const response = await sendForm(file);
			if (!response.ok) {
				throw new Error('error in sending form');
			} else {
				console.log('response', response);
			}
		} catch (error) {
			console.error('error', error);
		}
	};

	useEffect(() => {
		if (formInput) {
			console.log('formInput', formInput);
			handleSendForm(formInput).catch((error) => console.error('error', error));
		}
	}, [formInput]);

	return (
		<>
			<form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit((data) => setFormInput(data))}>
				<input type='file' {...register('file', { required: { value: true, message: 'all fields are required' } })} />
				{errors.file && errors.file.type === 'required' && <span>file is required</span>}
				<button type='submit'>Submit</button>
			</form>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				{entries.length > 0 ? (
					<>
						<h1>Entries</h1>
						<div>
							{entries.map((entry, index) => (
								<div key={index}>
									<span>{entry.text}</span>
								</div>
							))}
						</div>
					</>
				) : (
					<></>
				)}
				<button onClick={handleFetchEntries}>Test Get</button>
			</div>
		</>
	);
};

export default App;
