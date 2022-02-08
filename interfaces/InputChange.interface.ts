import { ISelectOption } from './SelectOption.interface';

export interface IInputChange {
	fieldName: string;
	value: any;
}
export interface ISelectChange<T = ISelectOption> extends IInputChange {
	idAccessor: keyof T;
}
