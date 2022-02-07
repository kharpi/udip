import React from 'react';
import Select from 'react-select';
import Button from '../UI/Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ISelected, ISelectedString } from '../../interfaces/Select.interface';
import InputText from '../UI/Input/InputText';

type Props = {
	reservations: Array<string>;
	submitReservation: (e: any) => void;
	selectRes: (e: ISelectedString) => void;
	selectComp: (e: ISelected) => void;
	selectServ: (e: ISelected) => void;
	selectCompanyOptions: ISelected[];
	serviceOptions: ISelected[] | undefined;
	selectedService: ISelected[];
	filterSubmit: (e: any) => void;
	fromDate: Date;
	setFromDate: (date: Date) => void;
	toDate: Date;
	setToDate: (date: Date) => void;
};

const NewReservation = ({
	reservations,
	submitReservation,
	selectRes,
	selectComp,
	selectServ,
	selectCompanyOptions,
	serviceOptions,
	selectedService,
	filterSubmit,
	fromDate,
	setFromDate,
	toDate,
	setToDate,
}: Props) => {
	return (
		<div>
			<h1>Reservation</h1>
			<div className='input__wrapper'>
				<label>Select company</label>
				<Select
					instanceId='cid'
					options={selectCompanyOptions}
					className='customSelect'
					onChange={(e: any) => selectComp(e)}
				/>
			</div>
			<div className='input__wrapper'>
				<label>Select service</label>
				<Select
					instanceId='ssid'
					options={serviceOptions}
					className='customSelect'
					isMulti
					value={selectedService}
					onChange={(e: any) => selectServ(e)}
				/>
			</div>
			<div>
				<h2>Filter available dates</h2>
				<form
					className='input'
					onSubmit={filterSubmit}
					style={{
						marginBottom: '2rem',
						border: '2px solid white',
						padding: '2rem',
					}}
				>
					<div style={{ display: 'flex' }}>
						<DatePicker
							selected={fromDate}
							onChange={(date: Date) => setFromDate(date)}
							showTimeSelect
							dateFormat='yyyy-MM-dd HH:mm'
						/>
					</div>
					<div style={{ display: 'flex' }}>
						<DatePicker
							selected={toDate}
							onChange={(date: Date) => setToDate(date)}
							showTimeSelect
							dateFormat='yyyy-MM-dd HH:mm'
						/>
					</div>
					<InputText
						withoutWrap
						type='number'
						name='max'
						id='max'
						defaultValue={10}
					/>
					<Button type='default'>Filter available dates</Button>
				</form>
				<form className='input' onSubmit={submitReservation}>
					<InputText type='text' name='name' id='name' label='Name' />
					<InputText type='tel' name='phone' id='phone' label='Phone' />
					<InputText type='email' name='email' id='email' label='Email' />
					<div className='input__wrapper'>
						<label>Available dates</label>
						<Select
							instanceId='ssid'
							className='customSelect'
							options={
								reservations?.map((res) => ({ label: res, value: res })) || []
							}
							onChange={(e: any) => selectRes(e)}
						/>
					</div>
					<div className='button__wrapper span2'>
						<Button type='default'>Reserve</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewReservation;
