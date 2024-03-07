import { convertFileToBlob } from './helpers';

export const sendForm = async (file: File) => {
	console.log('making fetch call');

	try {
		const fileBlob = convertFileToBlob(file);
		const formData = new FormData();
		formData.append('file', fileBlob);

		return await fetch('/.netlify/functions/actions/', {
			method: 'POST',
			body: formData,
		});
	} catch (error) {
		console.error('error', error);
		throw new Error('error in sending form');
	}
};
