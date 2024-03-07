// import axios from 'axios';

// const sendForm = async (file: File) => {
// 	console.log('making axios call');
// 	try {
// 		const formData = new FormData();
// 		formData.append('file', file);
// 		console.log('file', file);

// 		const response = await axios.post('/.netlify/functions/upload', formData, {
// 			headers: {
// 				'Content-Type': 'multipart/form-data',
// 			},
// 		});

// 		console.log('response', response);
// 		return response.data;
// 	} catch (error) {
// 		console.error('error', error);
// 	}
// };

const sendForm = async (file: File) => {
	console.log('making fetch call');
	try {
		const formData = new FormData();
		formData.append('file', file);
		console.log('file', file);
		return await fetch('/.netlify/functions/actions', {
			method: 'POST',
			body: formData,
		});
	} catch (error) {
		console.error('error', error);
		throw new Error('error in sending form');
	}
};



export default sendForm;
