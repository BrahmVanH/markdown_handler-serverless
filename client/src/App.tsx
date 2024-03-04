import React, { useEffect } from 'react';
import sendForm from '../utils/axios';
import { useForm, FieldValues } from 'react-hook-form';

interface IFormInput {
	file: File;
}
const App: React.FC = () => {
	console.log(React);

	const [formInput, setFormInput] = React.useState<IFormInput | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const handleSetFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file: File = e.target.files?.[0] as File;
		setFormInput(file);
	};

	const handleSendForm = async (formInput: IFormInput) => {
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
		<form encType='multipart/form-data'>
			<input type='file' {...register('file', { required: { value: true, message: 'all fields are required' } })} />
			<button type='submit'>Submit</button>
		</form>
	);
};

export default App;
