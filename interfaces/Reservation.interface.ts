import { IService } from './Service.interface';

export interface IReservation {
	id: number;
	name: string;
	phone: string;
	email: string;
	date: string;
	duration: number;
	works: IService[];
}

export type IReservationPopup = Pick<IReservation, 'name' | 'email' | 'phone'>;
