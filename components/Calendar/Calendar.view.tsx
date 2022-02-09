import React from 'react';
import { ICalendarForm } from '../../interfaces/forms/CalendarForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { IReservation } from '../../interfaces/Reservation.interface';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import styles from '../../styles/Calendar/Calendar.module.scss';

type Props = {
	reservations: IReservation[];
	deleteRes: (id: number) => void;
	form: ICalendarForm;
	onChange: (e: IInputChange) => void;
};

const CalendarView = ({ reservations, deleteRes, form, onChange }: Props) => {
	/**
	 * If you only need the follow up reservations, use this instead:
	 * ```
	 * const dateNow = new Date(Date.now()).getTime();
	 * const reservationsFiltered: IReservation[] =
	 * reservations.filter(res=>new Date(res.date).getTime()>dateNow);
	 * ```
	 * Then use reservationsFiltered instead of reservations
	 */
	const dates: string[] = [
		...new Set(reservations.map((res) => res.date.split('T')[0])),
	];
	return (
		<div>
			<Select {...form.company} onChange={onChange} />
			{form.company.value && <Select {...form.service} onChange={onChange} />}
			{reservations.length > 0 && (
				<>
					<h1>List of reservations</h1>
					<div className={styles.calendar__wrapper}>
						{dates.map((date) => (
							<div key={date} className={styles.calendar__item}>
								<div className={styles.calendar__date}>{date}</div>
								<div className={styles.calendar__res}>
									{reservations
										.filter((res) => res.date.split('T')[0] == date)
										.map((res) => (
											<div key={res.id} className={styles.calendar__res_item}>
												<p>
													<strong>Name:</strong> {res.name}
													<br />
													<strong>Email:</strong> {res.email}
													<br />
													<strong>Phone:</strong> {res.phone}
													<br />
													<strong>Date:</strong> {res.date.split('T')[0]}{' '}
													{res.date.split('T')[1]}
													<br />
													<strong>Duration:</strong> {res.duration}
													<br />
													<br />
												</p>
												<Button
													type='default'
													callback={() => deleteRes(res.id)}
												>
													Delete
												</Button>
											</div>
										))}
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CalendarView;
