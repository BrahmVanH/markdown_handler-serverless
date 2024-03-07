export const convertFileToBlob = (file: File) => {
	return new Blob([file], { type: 'text/markdown' });
};