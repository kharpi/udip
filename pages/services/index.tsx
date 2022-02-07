import { GetServerSideProps } from 'next';
import React from 'react';
import { apiURL } from '../../api/routes';
import ServiceList from '../../components/Service/ServiceList.view';
import { IService } from '../../interfaces/Service.interface';

type Props = {
	services: IService[];
};

const Services = ({ services }: Props) => {
	return <ServiceList services={services} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(apiURL('service'));
	const services = await res.json();
	return { props: { services } };
};

export default Services;
