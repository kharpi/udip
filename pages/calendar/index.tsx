import { cloneDeep } from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../api/routes';
import CalendarView from '../../components/Calendar/Calendar.view';
import { CalendarForm } from '../../forms/Calendar.form';
import { ICompany } from '../../interfaces/Company.interface';
import { ICalendarForm } from '../../interfaces/forms/CalendarForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { IReservation } from '../../interfaces/Reservation.interface';
import { IService } from '../../interfaces/Service.interface';
import { toastParams } from '../../utils/getToastParams.util';
import { changeHandler, setOptions } from '../../utils/InputChange.util';

type Props = {
	companies: ICompany[];
	services: IService[];
};

const Calendar = ({ companies, services }: Props) => {
	const initForm = (): ICalendarForm => {
		const initialForm: ICalendarForm = cloneDeep(CalendarForm);
		initialForm.company.options = companies.map((comp) => ({
			id: `${comp.id}`,
			name: comp.name,
		}));
		return initialForm;
	};

	const [form, setForm] = useState<ICalendarForm>(initForm());
	const [reservations, setReservations] = useState<IReservation[]>([]);

	const filter = (args: IInputChange): void => {
		let new_form = cloneDeep(form);
		new_form = changeHandler(form, args.fieldName, args.value);
		new_form = changeHandler(new_form, 'service', []);
		setForm(
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

	const showRes = async (args: IInputChange) => {
		setForm(changeHandler(form, args.fieldName, args.value));
		const res = await fetch(apiURL('reservation', 'get', `${args.value.id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'GET',
		});
		const result: IReservation[] = await res.json();
		if (result.length < 1)
			toast.info('No available reservations!', toastParams());
		setReservations(result.sort((a, b) => a.date.localeCompare(b.date)));
	};

	const onChange = (args: IInputChange): void => {
		args.fieldName === 'company' ? filter(args) : showRes(args);
	};

	const deleteRes = async (id: number) => {
		if (!confirm(`Are you sure?`)) return;
		setReservations(reservations.filter((r) => r.id !== id));
		const res = await fetch(apiURL('reservation', 'id', `${id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		if (res.status.toString().startsWith('2')) {
			Router.push('/calendar');
			toast.success('Successfully deleted reservation!', toastParams());
		} else {
			toast.error(await res.text(), toastParams());
		}
	};

	return (
		<CalendarView
			form={form}
			onChange={onChange}
			reservations={reservations}
			deleteRes={deleteRes}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	let res = await fetch(apiURL('company'));
	const companies = await res.json();
	res = await fetch(apiURL('service'));
	const services = await res.json();
	return { props: { companies, services } };
};

export default Calendar;
