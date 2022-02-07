import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../../api/routes';
import Service from '../../../components/Service/Service.view';
import { ICompany } from '../../../interfaces/Company.interface';
import { ISelected } from '../../../interfaces/Select.interface';
import { IService } from '../../../interfaces/Service.interface';
import { toastParams } from '../../../utils/getToastParams.util';

type Props = {
	service: IService;
	companies: ICompany[];
};

const SingleService = ({ service, companies }: Props) => {
	const [selected, setSelected] = useState<ISelected>({
		label: service.company.name,
		value: service.company.id,
	});
	if (!service || !companies) return <></>;
	const updateService = async (e: any) => {
		e.preventDefault();
		console.log(e.target as HTMLInputElement);
		const res = await fetch(apiURL('service', 'update'), {
			body: JSON.stringify({
				id: service.id,
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
		if (res.status === 202) {
			toast.success('Successfully updated!', toastParams());
		} else {
			toast.error(await res.text(), toastParams());
		}
	};
	const deleteService = async (e: React.ChangeEvent) => {
		e.preventDefault();
		if (!confirm(`Are you sure? Service: ${service.name}`)) return;
		const res = await fetch(apiURL('service', 'id', `${service.id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		if (res.status === 200) {
			Router.push('/services');
		} else {
			toast.error(await res.text(), toastParams());
		}
	};
	return (
		<Service
			companies={companies}
			service={service}
			updateService={updateService}
			setSelected={setSelected}
			selected={selected}
			deleteService={deleteService}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;
	const res = await fetch(apiURL('service', 'id', id));
	const service = await res.json();
	const compRes = await fetch(apiURL('company'));
	const companies = await compRes.json();
	return { props: { service, companies } };
};

export default SingleService;
