import React from 'react';
import { ICalendarForm } from '../../interfaces/forms/CalendarForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import { IReservation } from '../../interfaces/Reservation.interface';
import Select from '../UI/Select/Select';

type Props = {
	reservations: IReservation[];
	deleteRes: (id: number) => void;
	form: ICalendarForm;
	onChange: (e: IInputChange) => void;
};

const CalendarView = ({ reservations, deleteRes, form, onChange }: Props) => {
	return (
		<div>
			<Select {...form.company} onChange={onChange} />
			{form.company.value && <Select {...form.service} onChange={onChange} />}
			{reservations.length > 0 && (
				<>
					<h1>List of reservations</h1>
					{reservations.map((res) => (
						<div
							className='item'
							key={res.id}
							onClick={() => deleteRes(res.id)}
						>
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
								{res.works.map((work) => (
									<React.Fragment key={work.id}>
										<strong>Service:</strong> {work.name}
										<br />
									</React.Fragment>
								))}
							</p>
							<span>Delete</span>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default CalendarView;
