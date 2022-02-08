import Router from 'next/router';
import React, { useState } from 'react';
import { apiURL } from '../../api/routes';
import Company from '../../components/Company/Company.view';
import { getBH } from '../../utils/getBH.util';
import { toast } from 'react-toastify';
import { toastParams } from '../../utils/getToastParams.util';
import { handleArrayChange } from '../../utils/handleArrayChange.util';

const NewCompany = () => {
	const [fromArray, setFromArray] = useState<string[]>(
		new Array(7).fill('00:00')
	);
	const [toArray, setToArray] = useState<string[]>(new Array(7).fill('00:00'));
	const bhDays: Array<string> = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const createCompany = async (e: any) => {
		e.preventDefault();
		const res = await fetch(apiURL('company', 'create'), {
			body: JSON.stringify({
				name: e.target.name.value,
				address: e.target.address.value,
				businessHours: getBH(bhDays, fromArray, toArray),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status === 201) {
			Router.push('/companies');
		} else {
			toast.error(await res.text(), toastParams());
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		i: number,
		target: string
	) => {
		target === 'to'
			? handleArrayChange(e, i, toArray, setToArray)
			: handleArrayChange(e, i, fromArray, setFromArray);
	};

	return (
		<Company
			bhDays={bhDays}
			createCompany={createCompany}
			fromArray={fromArray}
			toArray={toArray}
			handleChange={handleChange}
		/>
	);
};

export default NewCompany;
