import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { ICompany } from '../../interfaces/Company.interface';
import Button from '../UI/Button/Button';

type Props = {
	companies: ICompany[];
};

const CompanyList = ({ companies }: Props) => {
	return (
		<div>
			<h1>List of companies</h1>
			{companies.map((company: ICompany, i: number) => (
				<Link href={`/companies/${company.id}`} key={`comp${i}`} passHref>
					<div className='item'>
						<p>
							<strong>{company.name}</strong>
						</p>
						<span>Open</span>
					</div>
				</Link>
			))}
			<Button type='default' callback={() => Router.push('/companies/new')}>
				Create new company
			</Button>
		</div>
	);
};

export default CompanyList;
