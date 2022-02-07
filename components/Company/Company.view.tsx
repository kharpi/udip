import React from 'react';
import { ICompany } from '../../interfaces/Company.interface';
import Button from '../UI/Button/Button';
import styles from '../../styles/Company/SingleCompany.module.scss';
import Router from 'next/router';
import InputText from '../UI/Input/InputText';

type Props = {
	deleteCompany?: (e: React.ChangeEvent) => void;
	updateCompany?: (e: any) => void;
	company?: ICompany;
	createCompany?: (e: any) => void;
	fromArray: Array<string>;
	toArray: Array<string>;
	bhDays: Array<string>;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		i: number,
		target: string
	) => void;
};

const Company = ({
	deleteCompany,
	updateCompany,
	company,
	createCompany,
	fromArray,
	toArray,
	bhDays,
	handleChange,
}: Props) => {
	return (
		<div>
			<form onSubmit={updateCompany || createCompany}>
				<InputText
					id='name'
					name='name'
					type='text'
					defaultValue={company?.name}
					label='Company name'
				/>
				<InputText
					id='address'
					name='address'
					type='text'
					defaultValue={company?.address}
					label='Company address'
				/>
				<div className={`input__wrapper span2`}>
					<label>Opening hours:</label>
					{bhDays.map((bh: string, i: number) => (
						<div key={`bh${i}`} className={styles.company__bh}>
							<label>{bh}</label>
							<InputText
								id={`from-${i}`}
								type='text'
								defaultValue={fromArray ? fromArray[i] : '00:00'}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									handleChange(e, i, 'from');
								}}
								withoutWrap
							/>
							<InputText
								id={`to-${i}`}
								type='text'
								defaultValue={toArray ? toArray[i] : '00:00'}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									handleChange(e, i, 'to');
								}}
								withoutWrap
							/>
						</div>
					))}
					{company ? (
						<div className='button__wrapper'>
							<Button type='default'>Save Company</Button>
							<Button type='error' callback={deleteCompany}>
								Delete Company
							</Button>
							<Button
								type='default'
								callback={(e: React.MouseEvent<HTMLElement>) => {
									e.preventDefault();
									Router.push('/companies');
								}}
							>
								Back
							</Button>
						</div>
					) : (
						<div className='button__wrapper'>
							<Button type='default'>Create Company</Button>
							<Button
								type='default'
								callback={(e: React.MouseEvent<HTMLElement>) => {
									e.preventDefault();
									Router.push('/companies');
								}}
							>
								Back
							</Button>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};

export default Company;
