import { ICalendarForm } from '../interfaces/forms/CalendarForm.interface';

export const CalendarForm: ICalendarForm = {
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
		value: null,
		required: true,
		options: [],
		labelText: 'Service',
		selectType: true,
	},
};
