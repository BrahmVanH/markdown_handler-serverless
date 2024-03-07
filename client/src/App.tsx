import React, { useEffect } from 'react';
import { sendForm } from '../utils/API';
import { useForm, FieldValues } from 'react-hook-form';

const App: React.FC = () => {
	console.log(React);


	const [formInput, setFormInput] = React.useState<FieldValues | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const handleSendForm = async (formInput: FieldValues) => {
		try {
			if (!formInput.file) {
				throw new Error('file is required');
			}
			const file: File = formInput.file;
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
		<form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit((data) => setFormInput(data))}>
			<input type='file' {...register('file', { required: { value: true, message: 'all fields are required' } })} />
			{errors.file && errors.file.type === 'required' && <span>file is required</span>}
			<button type='submit'>Submit</button>
		</form>
	);
};

export default App;
