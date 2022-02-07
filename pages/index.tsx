import Router from 'next/router';
import { useEffect } from 'react';

const Home = () => {
	useEffect(() => {
		Router.push('/companies');
	}, []);
	return <></>;
};

export default Home;
