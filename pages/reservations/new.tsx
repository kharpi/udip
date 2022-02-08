import { cloneDeep } from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { stringify } from 'query-string';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../api/routes';
import NewReservation from '../../components/Reservation/NewReservation.view';
import ReservationPopup from '../../components/Reservation/ReservationPopup.view';
import {
	ReservationForm,
	ReservationPopupForm,
} from '../../forms/Reservation.form';
import { ICompany } from '../../interfaces/Company.interface';
import {
	IReservationForm,
	IReservationPopupForm,
} from '../../interfaces/forms/ReservationForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { IService } from '../../interfaces/Service.interface';
import { toastParams } from '../../utils/getToastParams.util';
import { changeHandler, setOptions } from '../../utils/InputChange.util';
import { parseDate } from '../../utils/parseDate.util';

type Props = {
	services: IService[];
	servicesQuery: string;
	reservations: Array<string>;
	companies: ICompany[];
	fromDate: Date;
};

const Reservations = ({ services, companies }: Props) => {
	const initForm = (): IReservationForm => {
		const initialForm: IReservationForm = cloneDeep(ReservationForm);
		initialForm.company.options = companies.map((comp) => ({
			id: `${comp.id}`,
			name: comp.name,
		}));
		return initialForm;
	};

	const initPopupForm = (): IReservationPopupForm =>
		cloneDeep(ReservationPopupForm);

	const [form, set_form] = useState<IReservationForm>(initForm());
	const [popupForm, setPopupForm] = useState<IReservationPopupForm>(
		initPopupForm()
	);
	const [reservations, setReservations] = useState<string[]>([]);
	const [showPopup, setShowPopup] = useState<string>('');

	const companyChanged = (args: IInputChange) => {
		let new_form = cloneDeep(form);
		new_form = changeHandler(form, args.fieldName, args.value);
		new_form = changeHandler(new_form, 'service', []);
		set_form(
			setOptions(
				new_form,
				'service',
				services
					.filter((s) => s.company.id === +args.value.id)
					.map((serv) => ({
						id: `${serv.id}`,
						name: serv.name,
					}))
			)
		);
	};

	const onChange = (args: IInputChange): void => {
		if (args.fieldName === 'company' || args.fieldName === 'service') {
			setReservations([]);
		}
		if (args.fieldName === 'company') {
			companyChanged(args);
		} else set_form(changeHandler(form, args.fieldName, args.value));
	};

	const onPopupChange = (args: IInputChange): void => {
		setPopupForm(changeHandler(popupForm, args.fieldName, args.value));
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(
			apiURL(
				'reservation',
				'id',
				`${form.service.value.map((v) => v.id).join(',')}?${stringify({
					from: parseDate(form.fromDate.value.toString()),
					to: parseDate(form.toDate.value.toString()),
					max: form.limit.value,
				})}`
			)
		);
		const response = await res.json();
		if (response.length == 0)
			toast.error('No date is available', toastParams());
		setReservations(response);
	};

	const onPopupSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(apiURL('reservation', 'create'), {
			body: JSON.stringify({
				name: popupForm.name.value,
				phone: popupForm.phone.value,
				email: popupForm.email.value,
				date: showPopup,
				works: form.service.value.map((v) => v.id).join(','),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.status.toString().startsWith('2')) {
			toast.success('Reservation successfully created', toastParams());
			setShowPopup('');
			set_form(initForm());
			setPopupForm(initPopupForm());
			Router.push('/reservations');
		} else toast.error(await res.text(), toastParams());
	};

	const reserveFor = (date: string) => {
		setShowPopup(date);
	};

	return (
		<>
			<NewReservation
				reserveFor={reserveFor}
				form={form}
				onChange={onChange}
				onSubmit={onSubmit}
				reservations={reservations}
			/>
			<ReservationPopup
				form={popupForm}
				onSubmit={onPopupSubmit}
				onChange={onPopupChange}
				showPopup={showPopup}
				setShowPopup={setShowPopup}
			/>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	let res = await fetch(apiURL('service'));
	const services = await res.json();
	res = await fetch(apiURL('company'));
	const companies = await res.json();
	return {
		props: { services, companies },
	};
};

export default Reservations;
