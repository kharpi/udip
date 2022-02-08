import { cloneDeep } from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../../api/routes';
import Company from '../../../components/Company/Company.view';
import { CompanyForm } from '../../../forms/Company.form';
import {
	IBusinessHours,
	ICompany,
	ICompanyCreate,
} from '../../../interfaces/Company.interface';
import { ICompanyForm } from '../../../interfaces/forms/CompanyForm.interface';
import { IInputChange } from '../../../interfaces/InputChange.interface';
import { toastParams } from '../../../utils/getToastParams.util';
import { changeHandler } from '../../../utils/InputChange.util';

type Props = {
	company: ICompany;
};

const SingleCompany = ({ company }: Props) => {
	const initForm = (): ICompanyForm => {
		const initialForm: ICompanyForm = cloneDeep(CompanyForm);
		for (const field of Object.values(initialForm)) {
			if (field.id === 'name' || field.id === 'address') {
				//@ts-ignore
				initialForm[field.id].value = company[field.id];
			} else {
				//@ts-ignore
				initialForm[field.id].value = company.businessHours
					.filter((comp) => comp.day === field.id.toUpperCase())
					.map(
						(comp: IBusinessHours) =>
							comp.from.slice(0, 5) + '-' + comp.to.slice(0, 5)
					)
					.toString();
			}
		}
		return initialForm;
	};

	const [form, set_form] = useState<ICompanyForm>(initForm());

	const onChange = (args: IInputChange): void => {
		set_form(changeHandler(form, args.fieldName, args.value));
	};

	const parseFormData = (): ICompanyCreate => {
		const finalState: ICompanyCreate = {
			name: '',
			address: '',
			businessHours: '',
		};
		const bhArray: Array<string> = [];
		for (const field of Object.values(form)) {
			if (field.id === 'name' || field.id === 'address') {
				//@ts-ignore
				finalState[field.id] = field.value;
			} else {
				//@ts-ignore
				bhArray.push(
					`${field.id.toUpperCase()}:${field.value.replace(/:/g, '')}`
				);
			}
		}
		finalState.businessHours = bhArray.join(',');
		return finalState;
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();

		const res = await fetch(apiURL('company', 'update'), {
			body: JSON.stringify({
				id: company.id,
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

	const deleteCompany = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!confirm(`Are you sure? Company: ${company.name}`)) return;
		const res = await fetch(apiURL('company', 'id', `${company.id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		if (res.status === 200) {
			toast.success('Successfully deleted!', toastParams());
			Router.push('/companies');
		} else toast.error(await res.text(), toastParams());
	};

	return (
		<Company
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			deleteCompany={deleteCompany}
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
