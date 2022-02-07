import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { IService } from '../../interfaces/Service.interface';
import Button from '../UI/Button/Button';

type Props = {
	services: IService[];
};

const ServiceList = ({ services }: Props) => {
	return (
		<div>
			<h1>List of services</h1>
			{services.map((service: IService, i: number) => (
				<Link href={`/services/${service.id}`} key={`comp${i}`} passHref>
					<div className='item'>
						<p>
							<strong>{service.name}</strong>
							<br />
							{service.company.name}
						</p>
						<span>Open</span>
					</div>
				</Link>
			))}
			<Button type='default' callback={() => Router.push('/services/new')}>
				Create new service
			</Button>
		</div>
	);
};

export default ServiceList;
