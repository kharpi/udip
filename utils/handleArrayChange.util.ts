export const handleArrayChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	i: number,
	targetArray: Array<string>,
	stateCallback: (e: Array<string>) => void
) => {
	let tmpArray: Array<string> = [];
	tmpArray = [...targetArray];
	tmpArray[i] = e.target.value;
	stateCallback(tmpArray);
};
