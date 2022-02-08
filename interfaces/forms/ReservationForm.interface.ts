import {
	IInputMultiSelect,
	IInputDate,
	IInputSelect,
} from './../Input.interface';
import { IInputText } from '../../interfaces/Input.interface';

export interface IReservationForm {
	company: IInputSelect;
	service: IInputMultiSelect;
	fromDate: IInputDate;
	toDate: IInputDate;
	limit: IInputText;
}
export interface IReservationPopupForm {
	name: IInputText;
	email: IInputText;
	phone: IInputText;
}
