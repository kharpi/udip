import Router from 'next/router';
import React, { useState } from 'react';
import { apiURL } from '../../api/routes';
import Company from '../../components/Company/Company.view';
import { toast } from 'react-toastify';
import { toastParams } from '../../utils/getToastParams.util';
import { ICompanyForm } from '../../interfaces/forms/CompanyForm.interface';
import { cloneDeep } from 'lodash';
import { CompanyForm } from '../../forms/Company.form';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { changeHandler } from '../../utils/InputChange.util';
import { ICompanyCreate } from '../../interfaces/Company.interface';

const NewCompany = () => {
	const initForm = (): ICompanyForm => {
		const initialForm: ICompanyForm = cloneDeep(CompanyForm);
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
		for (const field of Object.values(form)) {
			if (field.id === 'name' || field.id === 'address') {
				//@ts-ignore
				finalState[field.id] = field.value;
			} else {
				//@ts-ignore
				finalState.businessHours =
					finalState.businessHours +
					`${field.id.toUpperCase()}:${field.value.replace(/:/g, '')},`;
			}
		}
		return finalState;
	};
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(apiURL('company', 'create'), {
			body: JSON.stringify(parseFormData()),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status === 201) {
			toast.success('Successfully created the new company!', toastParams());
			Router.push('/companies');
		} else {
			toast.error(await res.text(), toastParams());
		}
	};
	return <Company form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default NewCompany;
