import Router from 'next/router';
import React from 'react';
import { IReservation } from '../../interfaces/Reservation.interface';
import Button from '../UI/Button/Button';

type Props = {
	reservations: IReservation[];
	deleteRes: (id: number) => void;
};

const ReservationListView = ({ reservations, deleteRes }: Props) => {
	return (
		<div>
			<h1>List of reservations</h1>
			{reservations.map((res) => (
				<div className='item' key={res.id} onClick={() => deleteRes(res.id)}>
					<p>
						<strong>Name:</strong> {res.name}
						<br />
						<strong>Email:</strong> {res.email}
						<br />
						<strong>Phone:</strong> {res.phone}
						<br />
						<strong>Date:</strong> {res.date}
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
			<Button type='default' callback={() => Router.push('/reservations/new')}>
				Create new reservation
			</Button>
		</div>
	);
};

export default ReservationListView;
