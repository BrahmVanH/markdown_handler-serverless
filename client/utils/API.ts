// import { convertFileToBlob } from './helpers';

export const sendForm = async (file: File) => {
	console.log('making fetch call');

	try {
		if (!file) {
			throw new Error('no file');
		}

		console.log('file', file);
		console.log('file.name', file);

		// const fileBlob = await convertFileToBlob(file);
		// console.log('fileBlob', fileBlob);
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

export const getEntries = async () => {
	try {
		const response = await fetch('/.netlify/functions/actions/entries');
		if (!response.ok) {
			throw new Error('error in fetching entries');
		}
		
		const data = await response.json();
		if (!data) {
			throw new Error('no data');
		}
		console.log('data', data);
		return data;
	} catch (error) {
		console.error('error', error);
	}
};
