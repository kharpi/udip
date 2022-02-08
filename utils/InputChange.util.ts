import { cloneDeep } from 'lodash';
import { ISelectOption } from '../interfaces/SelectOption.interface';

export const changeHandler = <T>(
	oldForm: T,
	fieldName: string,
	value: string | object
): T => {
	let form: T = cloneDeep<T>(oldForm);
	//@ts-ignore
	form[fieldName].value = value;
	return form;
};

export const setOptions = <T>(
	oldForm: T,
	fieldName: string,
	options: Array<ISelectOption>
): T => {
	let form: T = cloneDeep<T>(oldForm);
	//@ts-ignore
	form[fieldName].options = options;
	return form;
};

export const setHidden = <T>(
	oldForm: T,
	fieldName: string,
	options: boolean
): T => {
	let form: T = cloneDeep<T>(oldForm);
	//@ts-ignore
	form[fieldName].hidden = options;
	return form;
};

export const setRequired = <T>(
	oldForm: T,
	fieldName: string,
	options: boolean
): T => {
	let form: T = cloneDeep<T>(oldForm);
	//@ts-ignore
	form[fieldName].required = options;
	return form;
};
