export interface ICompany {
	address: string;
	businessHours: IBusinessHours[];
	id: number;
	name: string;
}

export interface IBusinessHours {
	day: string;
	from: string;
	to: string;
}

export type ICompanyCreate = Omit<ICompany, 'id' | 'businessHours'> & {
	businessHours: string;
};
