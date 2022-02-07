import { IBusinessHours } from './../interfaces/Company.interface';
export const orderBH = (bh: IBusinessHours[]): Array<IBusinessHours> => {
	const list = [
		'MONDAY',
		'TUESDAY',
		'WEDNESDAY',
		'THURSDAY',
		'FRIDAY',
		'SATURDAY',
		'SUNDAY',
	];
	return bh
		.sort((a, b) => {
			return list.indexOf(a.day) - list.indexOf(b.day);
		})
		.map((bh) => ({
			day: bh.day,
			from: bh.from.slice(0, 5),
			to: bh.to.slice(0, 5),
		}));
};
