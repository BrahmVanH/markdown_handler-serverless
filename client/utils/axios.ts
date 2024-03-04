import axios from 'axios';

const sendForm = async (file: File) => {
	try {
		const formData = new FormData();
		formData.append('file', file);

		const response = await axios.post('/.netlify/functions/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		console.log('response', response);
		return response.data;
	} catch (error) {
		console.error('error', error);
	}
};

export default sendForm;
