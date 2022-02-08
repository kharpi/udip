import { cloneDeep } from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../api/routes';
import Service from '../../components/Service/Service.view';
import { ServiceForm } from '../../forms/Service.form';
import { IServiceForm } from '../../interfaces/forms/ServiceForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { toastParams } from '../../utils/getToastParams.util';
import { changeHandler } from '../../utils/InputChange.util';

type Props = {
	comp: number;
};

const NewService = ({ comp }: Props) => {
	const initForm = (): IServiceForm => {
		const initialForm: IServiceForm = cloneDeep(ServiceForm);
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
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(apiURL('service', 'create'), {
			body: JSON.stringify({ ...parseFormData(), companyId: comp }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status === 201) {
			toast.success('Successfully created the new service!', toastParams());
			Router.push('/services');
		} else {
			toast.error(await res.text(), toastParams());
		}
	};
	return <Service form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { comp } = context.query;
	return { props: { comp } };
};

export default NewService;
