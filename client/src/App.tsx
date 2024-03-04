import React, { useEffect } from 'react';
import sendForm from '../utils/axios';
import { useForm, FieldValues } from 'react-hook-form';

const App: React.FC = () => {
	console.log(React);

	const testFetch = async () => {
		console.log('making fetch call');
		const response = await fetch('.netlify/functions/', {
			method: 'GET',
		});
		const data = await response.json();
		console.log('data', data);
	};

	useEffect(() => {
		testFetch();
	}, []);

	const [formInput, setFormInput] = React.useState<FieldValues | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const handleSendForm = async (formInput: FieldValues) => {
		if (!formInput.file) {
			throw new Error('file is required');
		}
		const file: File = formInput.file;
		console.log('file', file);
		const response = await sendForm(file);
		console.log('response', response);
	};

	useEffect(() => {
		if (formInput) {
			console.log('formInput', formInput);
			handleSendForm(formInput);
		}
	}, [formInput]);

	return (
		<form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit((data) => setFormInput(data))}>
			<input type='file' {...register('file', { required: { value: true, message: 'all fields are required' } })} />
			{errors.file && errors.file.type === 'required' && <span>file is required</span>}
			<button type='submit'>Submit</button>
		</form>
	);
};

export default App;
