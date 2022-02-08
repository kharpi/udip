export const dateStringToDate = (dateString: string): Date => {
	const dateArr: string[] = dateString.split(/[.]|[\s]|[-]|[:]|[/]|[T]/g);
	const y: string = dateArr[0];
	const m: string = dateArr[1];
	const d: string = dateArr[2];
	const h: string = dateArr[3] || '00';
	const min: string = dateArr[4] || '00';
	const sec: string = dateArr[5] || '00';
	return new Date(`${y}-${m}-${d}T${h}:${min}:${sec}Z`);
};
