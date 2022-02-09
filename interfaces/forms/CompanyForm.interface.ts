import { IInputMaskedText } from './../Input.interface';
import { IInputText } from '../../interfaces/Input.interface';
export interface ICompanyForm {
	name: IInputText;
	address: IInputText;
	monday: IInputMaskedText;
	tuesday: IInputMaskedText;
	wednesday: IInputMaskedText;
	thursday: IInputMaskedText;
	friday: IInputMaskedText;
	saturday: IInputMaskedText;
	sunday: IInputMaskedText;
}
