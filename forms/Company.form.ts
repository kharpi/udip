import { ICompanyForm } from '../interfaces/forms/CompanyForm.interface';

export const CompanyForm: ICompanyForm = {
	name: {
		id: 'name',
		value: '',
		required: true,
		labelText: 'Name',
		type: 'text',
		textType: true,
	},
	address: {
		id: 'address',
		value: '',
		required: true,
		labelText: 'Address',
		type: 'text',
		textType: true,
	},
	monday: {
		id: 'monday',
		value: '',
		required: true,
		labelText: 'Monday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
	tuesday: {
		id: 'tuesday',
		value: '',
		required: true,
		labelText: 'Tuesday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
	wednesday: {
		id: 'wednesday',
		value: '',
		required: true,
		labelText: 'Wednesday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
	thursday: {
		id: 'thursday',
		value: '',
		required: true,
		labelText: 'Thursday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
	friday: {
		id: 'friday',
		value: '',
		required: true,
		labelText: 'Friday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
	saturday: {
		id: 'saturday',
		value: '',
		required: true,
		labelText: 'Saturday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
	sunday: {
		id: 'sunday',
		value: '',
		required: true,
		labelText: 'Sunday',
		type: 'text',
		textType: true,
		placeholder: '12:00-18:00',
		mask: '99:99-99:99',
		pattern:
			'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
	},
};
