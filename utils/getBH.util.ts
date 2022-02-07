export const getBH = (
	bhDays: Array<string>,
	fromArray: Array<string>,
	toArray: Array<string>
): string =>
	bhDays
		.map(
			(bh, i) =>
				`${bh}:${fromArray[i].replace(/:/g, '')}-${toArray[i].replace(
					/:/g,
					''
				)}`
		)
		.join();
