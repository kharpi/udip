import React from 'react';
import { IReservationPopupForm } from '../../interfaces/forms/ReservationForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import styles from '../../styles/Reservation/ReservationPopup.module.scss';
import Button from '../UI/Button/Button';
import InputText from '../UI/Input/InputText';

type Props = {
	form: IReservationPopupForm;
	onSubmit: (e: React.FormEvent) => void;
	onChange: (e: IInputChange) => void;
	showPopup: string;
	setShowPopup: (s: string) => void;
};

const ReservationPopup = ({
	form,
	onSubmit,
	onChange,
	showPopup,
	setShowPopup,
}: Props) => {
	if (showPopup == '') return <></>;
	return (
		<div className={styles.reservation_popup}>
			<div className='container'>
				<h1>Fill the fields</h1>
				<form onSubmit={onSubmit}>
					<InputText {...form.name} onChange={onChange} />
					<InputText {...form.email} onChange={onChange} />
					<InputText {...form.phone} onChange={onChange} />
					<div className='button__wrapper'>
						<Button type='default'>Reserve</Button>
						<Button type='default' callback={() => setShowPopup('')}>
							Close
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReservationPopup;
