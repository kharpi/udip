import Router from 'next/router';
import React from 'react';
import { ICompany } from '../../interfaces/Company.interface';
import { IService } from '../../interfaces/Service.interface';
import Button from '../UI/Button/Button';
import InputText from '../UI/Input/InputText';
import Select from 'react-select';
import { ISelected } from '../../interfaces/Select.interface';

type Props = {
	service?: IService;
	updateService?: (e: any) => void;
	createService?: (e: any) => void;
	deleteService?: (e: React.ChangeEvent) => void;
	companies: ICompany[];
	setSelected: (e: ISelected) => void;
	selected: ISelected;
};

const Service = ({
	service,
	updateService,
	createService,
	deleteService,
	companies,
	setSelected,
	selected,
}: Props) => {
	return (
		<div>
			<form onSubmit={updateService || createService}>
				<InputText
					id='name'
					name='name'
					type='text'
					defaultValue={service?.name}
					label='Service name'
				/>
				<InputText
					id='description'
					name='description'
					type='text'
					defaultValue={service?.description}
					label='Service description'
				/>
				<InputText
					id='duration'
					name='duration'
					type='number'
					defaultValue={service?.duration}
					label='Service duration'
				/>
				<div className='input__wrapper'>
					<label>Linked company</label>
					<Select
						className='customSelect'
						instanceId='sid'
						options={companies.map((comp) => ({
							label: comp.name,
							value: comp.id,
						}))}
						value={selected}
						onChange={(e: any) => setSelected(e)}
					/>
				</div>

				{service ? (
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
					<div className='button__wrapper span2'>
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
