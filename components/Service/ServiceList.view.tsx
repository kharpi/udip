import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { IService } from '../../interfaces/Service.interface';
import Button from '../UI/Button/Button';

type Props = {
	services: IService[];
	compId: number;
};

const ServiceList = ({ services, compId }: Props) => {
	return (
		<div>
			{services.map((service: IService, i: number) => (
				<Link href={`/services/${service.id}`} key={`comp${i}`} passHref>
					<div className='item'>
						<p>
							<strong>{service.name}</strong>
						</p>
						<span>Open</span>
					</div>
				</Link>
			))}
			<Button
				type='default'
				callback={() => Router.push(`/services/new?comp=${compId}`)}
			>
				Create new service
			</Button>
		</div>
	);
};

export default ServiceList;
