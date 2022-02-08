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

export interface ICompanyCreate {
	name: string;
	address: string;
	businessHours: string;
}
