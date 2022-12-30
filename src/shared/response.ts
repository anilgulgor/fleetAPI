type Response = {
	status: string;
	code: number;
	userMessage: string;
	developerMessage: string;
	data?: any;
};

export const ObjectResponse = (data: any) => {
	const objectResponse: Response = {
		status: data.status || 'OK',
		code: 200,
		userMessage: data.userMessage,
		developerMessage: data.developerMessage
	};
	return objectResponse;
};
