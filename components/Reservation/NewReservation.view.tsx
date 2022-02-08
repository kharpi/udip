import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import huHU from 'date-fns/locale/hu';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { IReservationForm } from '../../interfaces/forms/ReservationForm.interface';
import Select from '../UI/Select/Select';
import { Datepicker } from '../UI/Datepicker/Datepicker';
import InputText from '../UI/Input/InputText';
import Button from '../UI/Button/Button';
import styles from '../../styles/Reservation/Reservation.module.scss';

type Props = {
	form: IReservationForm;
	onChange: (args: IInputChange) => void;
	onSubmit: (e: React.FormEvent) => void;
	reservations: Array<string>;
	reserveFor: (date: string) => void;
};

const NewReservation = ({
	form,
	onChange,
	onSubmit,
	reservations,
	reserveFor,
}: Props) => {
	registerLocale('hu-HU', huHU);
	setDefaultLocale('hu');
	return (
		<div className='reservation'>
			<h1>New reservation</h1>
			<Select {...form.company} onChange={onChange} />
			{form.company.value && <Select {...form.service} onChange={onChange} />}
			{form.service.options.length > 0 && form.service.value.length > 0 && (
				<form onSubmit={onSubmit}>
					<Datepicker {...form.fromDate} onChange={onChange} />
					<Datepicker {...form.toDate} onChange={onChange} />
					<InputText {...form.limit} onChange={onChange} />
					<Button type='default'>Show available dates</Button>
				</form>
			)}
			{reservations.length > 0 && (
				<>
					<h1>select date</h1>
					<div className={styles.reservation__mapped}>
						{reservations.map((res, i) => (
							<div key={`res${i}`}>
								<Button type='default' callback={() => reserveFor(res)}>
									{res.split(' ')[0]}
									<br />
									<strong>{res.split(' ')[1]}</strong>
								</Button>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default NewReservation;
