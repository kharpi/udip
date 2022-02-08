import {
	IServiceForm,
	IServiceFormStart,
} from './../interfaces/forms/ServiceForm.interface';

export const ServiceStartForm: IServiceFormStart = {
	company: {
		id: 'company',
		value: null,
		required: true,
		options: [],
		labelText: 'Company',
		selectType: true,
	},
};
export const ServiceForm: IServiceForm = {
	name: {
		id: 'name',
		value: '',
		required: true,
		labelText: 'Name',
		type: 'text',
		textType: true,
	},
	description: {
		id: 'description',
		value: '',
		required: true,
		labelText: 'Description',
		type: 'text',
		textType: true,
	},
	duration: {
		id: 'duration',
		value: '1',
		required: true,
		labelText: 'Duration',
		type: 'number',
		textType: true,
	},
};
