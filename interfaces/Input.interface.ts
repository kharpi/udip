import { ISelectOption } from './SelectOption.interface';

export interface ICommonInputProps {
	id: string;
	required?: boolean;
	className?: string;
	labelText?: string;
	children?: JSX.Element;
	hidden?: boolean;
	disabled?: boolean;
	wrapperClass?: string;
}

export interface IInputText extends ICommonInputProps {
	type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
	textType?: true;
	pattern?: string;
	value: string;
	placeholder?: string;
}
export interface IInputFile {
	id: string;
	fileType?: string;
	value: Blob | null;
	labelText?: string;
	fileInputType?: true;
	hasContent?: string;
	required?: boolean;
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
	placeholder?: string;
	value: null | T;
	options: T[];
}
export interface IInputTextArea extends ICommonInputProps {
	value: string;
	textAreaType: true;
}

export interface IInputBoolean extends ICommonInputProps {
	value: boolean;
	booleanType?: true;
	name?: string;
}
export interface IInputBoolean extends ICommonInputProps {
	value: boolean;
	booleanType?: true;
	name?: string;
	labelTextBefore?: string;
	labelTextAfter?: string;
	href?: string;
	hrefText?: string;
}
