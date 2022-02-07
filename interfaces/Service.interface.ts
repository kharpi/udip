import { ICompany } from './Company.interface';

export interface IService {
	id: number;
	name: string;
	description: string;
	duration: number;
	company: ICompany;
}
