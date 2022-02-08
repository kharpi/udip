import React from 'react';
import InputText from '../UI/Input/InputText';
import { ICompanyForm } from '../../interfaces/forms/CompanyForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import Button from '../UI/Button/Button';
import Router from 'next/router';

type Props = {
	form: ICompanyForm;
	onChange: (args: IInputChange) => void;
	onSubmit: (e: React.FormEvent) => void;
	deleteCompany?: (e: React.FormEvent) => void;
};

const Company = ({ form, onChange, onSubmit, deleteCompany }: Props) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<InputText {...form.name} onChange={onChange} />
				<InputText {...form.address} onChange={onChange} />
				<InputText {...form.monday} onChange={onChange} />
				<InputText {...form.tuesday} onChange={onChange} />
				<InputText {...form.wednesday} onChange={onChange} />
				<InputText {...form.thursday} onChange={onChange} />
				<InputText {...form.friday} onChange={onChange} />
				<InputText {...form.saturday} onChange={onChange} />
				<InputText {...form.sunday} onChange={onChange} />
				{deleteCompany !== undefined ? (
					<div className='button__wrapper span2'>
						<Button type='default'>Save Company</Button>
						<Button type='error' callback={deleteCompany}>
							Delete Company
						</Button>
						<Button
							type='default'
							callback={(e: React.MouseEvent<HTMLElement>) => {
								e.preventDefault();
								Router.push('/companies');
							}}
						>
							Back
						</Button>
					</div>
				) : (
					<div className='button__wrapper'>
						<Button type='default'>Create Company</Button>
						<Button
							type='default'
							callback={(e: React.MouseEvent<HTMLElement>) => {
								e.preventDefault();
								Router.push('/companies');
							}}
						>
							Back
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};

export default Company;
