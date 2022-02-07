import React from 'react';
import { ToastContainer } from 'react-toastify';
import Menu from '../Menu/Menu.view';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
	children: React.ReactChild;
};

const Layout = ({ children }: Props) => {
	return (
		<>
			<ToastContainer />
			<header>
				<Menu />
			</header>
			<main>
				<div className='container'>{children}</div>
			</main>
		</>
	);
};

export default Layout;
