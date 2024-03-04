import React from 'react';
import sendForm from '../utils/axios';

const  App: React.FC = () => {

	console.log(React);

	const handleSendForm = async (e: React.ChangeEvent<HTMLInputElement>) => {	
		const file: File = e.target.files?.[0] as File;
		console.log('file', file);
		const response = await sendForm(file);
		console.log('response', response);
	}

	return (
		
		<form>
			<input type="file" name="file" onChange={handleSendForm} />
		</form>
	);
}

export default App;
