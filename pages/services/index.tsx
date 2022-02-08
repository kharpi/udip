import { cloneDeep } from 'lodash';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { apiURL } from '../../api/routes';
import ServiceChooser from '../../components/Service/ServiceChooser.view';
import ServiceList from '../../components/Service/ServiceList.view';
import { ServiceStartForm } from '../../forms/Service.form';
import { ICompany } from '../../interfaces/Company.interface';
import { IServiceFormStart } from '../../interfaces/forms/ServiceForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { ISelectOption } from '../../interfaces/SelectOption.interface';
import { IService } from '../../interfaces/Service.interface';
import { changeHandler } from '../../utils/InputChange.util';

type Props = {
	companies: ICompany[];
	services: IService[];
};

const Services = ({ companies, services }: Props) => {
	const initForm = (): IServiceFormStart => {
		const initialForm: IServiceFormStart = cloneDeep(ServiceStartForm);
		initialForm.company.options = companies.map((comp) => ({
			id: `${comp.id}`,
			name: comp.name,
		}));
		return initialForm;
	};

	const [form, setForm] = useState<IServiceFormStart>(initForm());
	const [filteredServices, setFilteredServices] = useState<IService[]>([]);

	const filter = (comp: ISelectOption): void => {
		setFilteredServices(services.filter((s) => s.company.id === +comp.id));
	};

	const onChange = (args: IInputChange): void => {
		setForm(changeHandler(form, args.fieldName, args.value));
		filter(args.value);
	};

	return (
		<>
			<ServiceChooser form={form} onChange={onChange} />
			{form.company.value && (
				<ServiceList
					services={filteredServices}
					compId={+form.company.value.id}
				/>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	let res = await fetch(apiURL('company'));
	const companies = await res.json();
	res = await fetch(apiURL('service'));
	const services = await res.json();
	return { props: { companies, services } };
};

export default Services;
