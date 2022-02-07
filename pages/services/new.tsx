import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../api/routes';
import Service from '../../components/Service/Service.view';
import { ICompany } from '../../interfaces/Company.interface';
import { ISelected } from '../../interfaces/Select.interface';
import { toastParams } from '../../utils/getToastParams.util';

type Props = {
	companies: ICompany[];
};

const NewService = ({ companies }: Props) => {
	const [selected, setSelected] = useState<ISelected>({
		label: companies[0].name,
		value: companies[0].id,
	});

	const createService = async (e: any) => {
		e.preventDefault();

		const res = await fetch(apiURL('service', 'create'), {
			body: JSON.stringify({
				name: e.target.name.value,
				description: e.target.description.value,
				duration: e.target.duration.value,
				companyId: selected.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status === 201) {
			Router.push('/services');
		} else {
			toast.error(await res.text(), toastParams());
		}
	};

	return (
		<Service
			companies={companies}
			createService={createService}
			setSelected={setSelected}
			selected={selected}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const compRes = await fetch(`http://localhost:8080/company`);
	const companies = await compRes.json();
	return { props: { companies } };
};

export default NewService;
