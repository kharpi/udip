const baseURL = 'http://localhost:8080';

export const apiURL = (
	name: 'company' | 'service' | 'reservation',
	type?: 'update' | 'create' | 'id' | 'get',
	value?: string | string[] | boolean
) => {
	switch (type) {
		case 'id':
			return `${baseURL}/${name}/${value}`;
		case 'get':
			return `${baseURL}/${name}/${type}/${value}`;
		case 'update':
			return `${baseURL}/${name}/update`;
		case 'create':
			return `${baseURL}/${name}/create`;
		default:
			return `${baseURL}/${name}/`;
	}
};
