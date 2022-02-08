import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/General/Menu.module.scss';

const Menu = () => {
	const router = useRouter();
	return (
		<nav className={styles.nav__container}>
			<ul className={styles.nav__wrapper}>
				<li
					className={`${styles.nav__item} ${
						router.pathname.startsWith('/companies')
							? styles['nav__item--active']
							: ''
					}`}
				>
					<Link href='/companies'>Companies</Link>
				</li>
				<li
					className={`${styles.nav__item} ${
						router.pathname.startsWith('/services')
							? styles['nav__item--active']
							: ''
					}`}
				>
					<Link href='/services'>Services</Link>
				</li>
				<li
					className={`${styles.nav__item} ${
						router.pathname.startsWith('/reservations')
							? styles['nav__item--active']
							: ''
					}`}
				>
					<Link href='/reservations'>Reservations</Link>
				</li>
				<li
					className={`${styles.nav__item} ${
						router.pathname.startsWith('/calendar')
							? styles['nav__item--active']
							: ''
					}`}
				>
					<Link href='/calendar'>Calendar</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
