import { ISelectOption } from './SelectOption.interface';

export interface ICommonInputProps {
	id: string;
	valid?: boolean;
	hidden?: boolean;
	touched?: boolean;
	required?: boolean;
	children?: JSX.Element;
	disabled?: boolean;
	className?: string;
	labelText?: string;
	warningText?: string;
	description?: string;
	placeholder?: string;
	manualRender?: boolean;
	hasAfterEffect?: boolean;
	wrapperClass?: string;
}

export interface IInputText extends ICommonInputProps {
	value: string;
	inlineLabel?: boolean;
	isNumeric?: boolean;
	isFloat?: boolean;
	autoComplete?: 'on' | 'off';
	type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
	textType?: true;
	placeholder?: string;
	maxNumber?: number;
	minNumber?: number;
	maxLength?: number;
	minLength?: number;
	pattern?: string;
}

export interface IInputMaskedText extends IInputText {
	mask: string;
}

export interface IInputSelect<T = ISelectOption> extends ICommonInputProps {
	filterOption?: (option: any, rawInput: string) => boolean;
	sortOption?: (optionA: any, optionB: any) => number;
	noOptionsMessage?: string;
	loadingMessage?: string;
	closeMenuOnSelect?: boolean;
	closeMenuOnScroll?: boolean;
	escapeClearsValue?: boolean;
	classNamePrefix?: string;
	isClearable?: boolean;
	nameAccessor?: keyof T;
	menuIsOpen?: boolean;
	idAccessor?: keyof T;
	isLoading?: boolean;
	selectType?: true;
	isMulti?: boolean;
	value: null | T;
	options: T[];
}

export interface IInputMultiSelect<T = ISelectOption>
	extends Omit<IInputSelect<T>, 'value'> {
	value: T[];
}

export interface IInputDate extends ICommonInputProps {
	value: string | Date;
	maxDate?: Date;
	minDate?: Date;
	showTime?: boolean;
	isClearable?: boolean;
	timeInterval?: number;
	dateType?: true;
	showTimeSelectOnly?: boolean;
	withPortal?: boolean;
	locale?: string | Locale | undefined;
	dtFormat?: string;
	timeCaption?: string;
}

export type IInputTypes = IInputText | IInputSelect<any> | IInputDate;
