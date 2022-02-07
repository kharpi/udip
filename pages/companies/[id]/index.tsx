import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../../api/routes';
import Company from '../../../components/Company/Company.view';
import { ICompany } from '../../../interfaces/Company.interface';
import { getBH } from '../../../utils/getBH.util';
import { toastParams } from '../../../utils/getToastParams.util';
import { orderBH } from '../../../utils/orderBH.util';

type Props = {
	company: ICompany;
};

const SingleCompany = ({ company }: Props) => {
	const companyHours = orderBH(company.businessHours);
	const [fromArray, setFromArray] = useState<string[]>([
		...companyHours.map((bh) => bh.from),
	]);
	const [toArray, setToArray] = useState<string[]>([
		...companyHours.map((bh) => bh.to),
	]);
	const bhDays = companyHours.map((bh) => bh.day);

	const updateCompany = async (e: any) => {
		e.preventDefault();

		const res = await fetch(apiURL('company', 'update'), {
			body: JSON.stringify({
				id: company.id,
				name: e.target.name.value,
				address: e.target.address.value,
				businessHours: getBH(bhDays, fromArray, toArray),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status.toString().startsWith('2'))
			toast.success('Successfully updated!', toastParams());
		else toast.error(await res.text(), toastParams());
	};

	const deleteCompany = async (e: React.ChangeEvent) => {
		e.preventDefault();
		if (!confirm(`Are you sure? Company: ${company.name}`)) return;
		const res = await fetch(apiURL('company', 'id', `${company.id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		if (res.status === 200) {
			Router.push('/companies');
		} else toast.error(await res.text(), toastParams());
	};
	//TODO: generic it!
	const handleChange = (e: any, i: number, target: string) => {
		let tmpArray: Array<string> = [];
		if (target === 'to') {
			tmpArray = [...toArray];
			tmpArray[i] = e.target.value;
			setToArray(tmpArray);
		} else {
			tmpArray = [...fromArray];
			tmpArray[i] = e.target.value;
			setFromArray(tmpArray);
		}
	};

	return (
		<Company
			deleteCompany={deleteCompany}
			updateCompany={updateCompany}
			company={company}
			fromArray={fromArray}
			toArray={toArray}
			bhDays={bhDays}
			handleChange={handleChange}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;
	const res = await fetch(apiURL('company', 'id', id));
	const company = await res.json();
	return { props: { company } };
};

export default SingleCompany;
