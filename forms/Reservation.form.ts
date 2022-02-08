import { IReservationPopupForm } from './../interfaces/forms/ReservationForm.interface';
import { IReservationForm } from '../interfaces/forms/ReservationForm.interface';

export const ReservationForm: IReservationForm = {
	company: {
		id: 'company',
		value: null,
		required: true,
		options: [],
		labelText: 'Company',
		selectType: true,
	},
	service: {
		id: 'service',
		value: [],
		required: true,
		options: [],
		labelText: 'Service',
		selectType: true,
		isMulti: true,
	},
	fromDate: {
		id: 'fromDate',
		value: new Date(),
		required: true,
		labelText: 'Start date',
		showTime: true,
		dtFormat: 'yyyy-MM-dd HH:mm',
		dateType: true,
	},
	toDate: {
		id: 'toDate',
		value: new Date(Date.now() + 24 * 60 * 60 * 1000),
		required: true,
		labelText: 'End date',
		showTime: true,
		dtFormat: 'yyyy-MM-dd HH:mm',
		dateType: true,
	},
	limit: {
		id: 'limit',
		value: '10',
		required: true,
		labelText: 'Limit',
		type: 'number',
		textType: true,
	},
};

export const ReservationPopupForm: IReservationPopupForm = {
	name: {
		id: 'name',
		value: '',
		required: true,
		labelText: 'Name',
		type: 'text',
		textType: true,
	},
	email: {
		id: 'email',
		value: '',
		required: true,
		labelText: 'Email',
		type: 'email',
		textType: true,
	},
	phone: {
		id: 'phone',
		value: '',
		required: true,
		labelText: 'Phone',
		type: 'tel',
		textType: true,
	},
};
