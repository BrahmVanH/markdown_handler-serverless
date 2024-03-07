import React, { useEffect } from 'react';
// import sendForm from '../utils/axios';
import { useForm, FieldValues } from 'react-hook-form';

const App: React.FC = () => {
	console.log(React);

	const testGet = async () => {
		console.log('test');
		try {
			const response = await fetch('/.netlify/functions/actions/', {
				method: 'GET',
			});
			// const data = await response;
			if (!response.ok) {
				throw new Error('error in sending form');
			} else {
				console.log('response', response);
			}
		} catch (error) {
			console.error('error', error);
			throw new Error('error in sending form');
		}
	};

	// const testPost = async () => {
	// 	console.log('test');
	// 	try {
	// 		const testString = 'test string';
	// 		const response = await fetch('/.netlify/functions/actions/', {
	// 			method: 'POST',
	// 			body: JSON.stringify({ testString }),
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});
	// 		if (!response.ok) {
	// 			console.log('response', response);
	// 			throw new Error('error in sending form');
	// 		} else {
	// 			const data = await response.json();
	// 			console.log('data', data);
	// 		}
	// 	} catch (error) {
	// 		console.error('error', error);
	// 		throw new Error('error in sending form');
	// 	}
	// };

	const sendForm = async (file: File) => {
		console.log('making fetch call');

		try {
			const formData = new FormData();
			formData.append('file', file);

			return await fetch('/.netlify/functions/actions/', {
				method: 'POST',
				body: formData,
			});
		} catch (error) {
			console.error('error', error);
			throw new Error('error in sending form');
		}
	};

	useEffect(() => {
		testGet();
	}, []);

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
