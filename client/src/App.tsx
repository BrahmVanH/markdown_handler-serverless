import React from 'react';


const  App: React.FC = () => {

	console.log(React);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
			<input type='file' name='file' />
		</div>
	);
}

export default App;
