import { cloneDeep } from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../../api/routes';
import Service from '../../../components/Service/Service.view';
import { ServiceForm } from '../../../forms/Service.form';
import { IServiceForm } from '../../../interfaces/forms/ServiceForm.interface';
import { IInputChange } from '../../../interfaces/InputChange.interface';
import { IService } from '../../../interfaces/Service.interface';
import { toastParams } from '../../../utils/getToastParams.util';
import { changeHandler } from '../../../utils/InputChange.util';

type Props = {
	service: IService;
};

const SingleService = ({ service }: Props) => {
	const initForm = (): IServiceForm => {
		const initialForm: IServiceForm = cloneDeep(ServiceForm);
		for (const field of Object.values(initialForm)) {
			//@ts-ignore
			initialForm[field.id].value = service[field.id];
		}
		return initialForm;
	};

	const [form, set_form] = useState<IServiceForm>(initForm());

	const onChange = (args: IInputChange): void => {
		set_form(changeHandler(form, args.fieldName, args.value));
	};

	const parseFormData = (): IServiceForm => {
		const finalState: IServiceForm = initForm();
		for (const field of Object.values(form)) {
			//@ts-ignore
			finalState[field.id] = field.value;
		}
		return finalState;
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		const res = await fetch(apiURL('service', 'update'), {
			body: JSON.stringify({
				id: service.id,
				companyId: service.company.id,
				...parseFormData(),
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

	const deleteService = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!confirm(`Are you sure? Service: ${service.name}`)) return;
		const res = await fetch(apiURL('service', 'id', `${service.id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		if (res.status === 200) {
			toast.success('Successfully deleted!', toastParams());
			Router.push('/services');
		} else toast.error(await res.text(), toastParams());
	};
	return (
		<Service
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			deleteService={deleteService}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;
	const res = await fetch(apiURL('service', 'id', id));
	const service = await res.json();
	return { props: { service } };
};

export default SingleService;
