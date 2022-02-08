import Router from 'next/router';
import React from 'react';
import Button from '../UI/Button/Button';
import InputText from '../UI/Input/InputText';
import { IServiceForm } from '../../interfaces/forms/ServiceForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';

type Props = {
	form: IServiceForm;
	onChange: (args: IInputChange) => void;
	onSubmit: (e: React.FormEvent) => void;
	deleteService?: (e: React.FormEvent) => void;
};

const Service = ({ form, onChange, onSubmit, deleteService }: Props) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<InputText {...form.name} onChange={onChange} />
				<InputText {...form.description} onChange={onChange} />
				<InputText {...form.duration} onChange={onChange} />
				{deleteService !== undefined ? (
					<div className='button__wrapper span2'>
						<Button type='default'>Save Service</Button>
						<Button type='error' callback={deleteService}>
							Delete Service
						</Button>
						<Button
							type='default'
							callback={(e: React.ChangeEvent) => {
								e.preventDefault();
								Router.push('/services');
							}}
						>
							Back
						</Button>
					</div>
				) : (
					<div className='button__wrapper'>
						<Button type='default'>Create Service</Button>
						<Button
							type='default'
							callback={(e: React.ChangeEvent) => {
								e.preventDefault();
								Router.push('/services');
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

export default Service;
