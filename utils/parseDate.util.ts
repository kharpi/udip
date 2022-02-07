export const parseDate = (date: string) => {
	return [
		new Date(date).toISOString().slice(0, 10),
		[
			new Date(date).toLocaleTimeString('hu-HU').split(':')[0].padStart(2, '0'),
			new Date(date).toLocaleTimeString('hu-HU').split(':')[1].padStart(2, '0'),
		].join(':'),
	]
		.join(' ')
		.trim();
};
