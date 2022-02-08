import React from 'react';
import styles from '../../../styles/UI/Button.module.scss';

type Props = {
	children: React.ReactChild | React.ReactChild[];
	callback?: any;
	type: 'error' | 'default';
};

const Button = ({ callback, children, type }: Props) => {
	return (
		<div
			className={`${styles.button__wrapper} ${
				styles[`button__wrapper--${type}`]
			}`}
		>
			<button onClick={callback}>{children}</button>
		</div>
	);
};

export default Button;
