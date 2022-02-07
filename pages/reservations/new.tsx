import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { stringify } from 'query-string';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../api/routes';
import NewReservation from '../../components/Reservation/NewReservation.view';
import { ICompany } from '../../interfaces/Company.interface';
import { ISelected } from '../../interfaces/Select.interface';
import { IService } from '../../interfaces/Service.interface';
import { toastParams } from '../../utils/getToastParams.util';
import { parseDate } from '../../utils/parseDate.util';

type Props = {
	services: IService[];
	servicesQuery: string;
	reservations: Array<string>;
	companies: ICompany[];
	fromDate: Date;
};

const Reservations = ({
	services,
	servicesQuery,
	reservations,
	companies,
}: Props) => {
	const [selectedReservation, setSelectedReservation] = useState<ISelected>({
		label: '',
		value: 0,
	});
	const [selectedService, setSelectedService] = useState<ISelected[]>([]);
	const [serviceOptions, setServiceOptions] = useState<ISelected[] | undefined>(
		[]
	);
	const [fromDate, setFromDate] = useState<Date>(new Date());
	const [toDate, setToDate] = useState<Date>(
		new Date(Date.now() + 24 * 60 * 60 * 1000)
	);
	const selectCompanyOptions: ISelected[] = companies.map((company) => ({
		label: `${company.name}`,
		value: company.id,
	}));
	const selectRes = (e: any) => {
		setSelectedReservation(e);
	};
	const selectComp = (e: ISelected) => {
		setSelectedService([]);
		setServiceOptions(
			services
				.filter((service) => service.company.id === e.value)
				.map((service) => ({ label: service.name, value: service.id }))
		);
		toast.info('Select service!', toastParams());
	};
	const filter = (e: any) => {
		const params = e.map((selection: any) => selection.value).join(',');
		Router.push(`/reservations/new/?servicesQuery=${params}`);
		if (params)
			toast.info(
				'Fill the fields and select from available dates!',
				toastParams()
			);
	};
	const selectServ = (e: any) => {
		setSelectedService(e);
		filter(e);
	};
	const filterSubmit = async (e: any) => {
		e.preventDefault();
		const params = {
			max: e.target.max.value,
			from: parseDate(fromDate.toString()),
			to: parseDate(toDate.toString()),
		};
		Router.push(
			`/reservations/new/?servicesQuery=${servicesQuery}&${stringify(params)}`
		);
		toast.success('Successfully filtered available dates!', toastParams());
	};
	const submitReservation = async (e: any) => {
		e.preventDefault();
		const name = e.target.name.value;
		const phone = e.target.phone.value;
		const email = e.target.email.value;
		const res = await fetch(apiURL('reservation', 'create'), {
			body: JSON.stringify({
				name,
				phone,
				email,
				date: selectedReservation.value,
				works: servicesQuery,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status.toString().startsWith('2')) Router.push('/reservations');
		else toast.error(await res.text(), toastParams());
	};

	return (
		<NewReservation
			reservations={reservations}
			submitReservation={submitReservation}
			selectRes={selectRes}
			selectComp={selectComp}
			selectServ={selectServ}
			filterSubmit={filterSubmit}
			selectCompanyOptions={selectCompanyOptions}
			serviceOptions={serviceOptions}
			selectedService={selectedService}
			fromDate={fromDate}
			setFromDate={setFromDate}
			toDate={toDate}
			setToDate={setToDate}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const servicesQuery = context.query.servicesQuery || null;
	const from = context.query.from || null;
	const to = context.query.to || null;
	const max = context.query.max || null;
	let res = await fetch(apiURL('service'));
	const services = await res.json();
	res = await fetch(apiURL('company'));
	const companies = await res.json();
	let reservations = null;
	if (servicesQuery && from === null) {
		res = await fetch(apiURL('reservation', 'id', `${servicesQuery}`));
		reservations = await res.json();
	} else if (servicesQuery && from && to) {
		const fromDate = parseDate(from.toString());
		const toDate = parseDate(to.toString());
		res = await fetch(
			apiURL(
				'reservation',
				'id',
				`${servicesQuery}?${stringify({
					from: fromDate,
					to: toDate,
					max,
				})}`
			)
		);
		reservations = await res.json();
	}
	return {
		props: { services, servicesQuery, reservations, companies },
	};
};

export default Reservations;
