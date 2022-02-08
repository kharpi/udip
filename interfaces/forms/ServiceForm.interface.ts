import { IInputSelect, IInputText } from '../../interfaces/Input.interface';
export interface IServiceFormStart {
	company: IInputSelect;
}
export interface IServiceForm {
	name: IInputText;
	description: IInputText;
	duration: IInputText;
}
