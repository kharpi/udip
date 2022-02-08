import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { apiURL } from '../../api/routes';
import ReservationListView from '../../components/Reservation/ListReservation.view';
import { IReservation } from '../../interfaces/Reservation.interface';
import { toastParams } from '../../utils/getToastParams.util';

type Props = {
	reservations: IReservation[];
};

const ReservationList = ({ reservations }: Props) => {
	const deleteRes = async (id: number) => {
		if (!confirm(`Are you sure?`)) return;
		const res = await fetch(apiURL('reservation', 'id', `${id}`), {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		if (res.status.toString().startsWith('2')) {
			Router.push('/reservations');
			toast.success('Successfully deleted reservation!', toastParams());
		} else {
			toast.error(await res.text(), toastParams());
		}
	};
	return (
		<ReservationListView reservations={reservations} deleteRes={deleteRes} />
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(apiURL('reservation'));
	const reservations = await res.json();
	return { props: { reservations } };
};

export default ReservationList;
