import { IInputText } from '../../interfaces/Input.interface';

export interface IRecipient {
	id: string;
	name: string;
	addr: string;
}

export interface ICompanyForm {
	name: IInputText;
	address: IInputText;
	monday: IInputText;
	tuesday: IInputText;
	wednesday: IInputText;
	thursday: IInputText;
	friday: IInputText;
	saturday: IInputText;
	sunday: IInputText;
}
