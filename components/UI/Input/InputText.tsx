import React from 'react';

type Props = {
	classes?: string[];
	id: string;
	name?: string;
	type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
	defaultValue?: string | number;
	value?: string;
	disabled?: boolean;
	required?: boolean;
	placeholder?: string;
	label?: string;
	onChange?: any;
	withoutWrap?: boolean;
};

const InputText = ({
	classes,
	id,
	name,
	type,
	defaultValue,
	value,
	disabled,
	required,
	placeholder,
	label,
	onChange,
	withoutWrap,
}: Props) => {
	let wrapperClass = 'input__wrapper';
	if (classes) wrapperClass += ` ${classes.join(' ')}`;
	return (
		<>
			{!withoutWrap ? (
				<div className={wrapperClass}>
					<label>{label}</label>
					<input
						id={id}
						name={name}
						type={type}
						defaultValue={defaultValue}
						value={value}
						disabled={disabled}
						required={required}
						placeholder={placeholder}
						onChange={onChange}
					/>
				</div>
			) : (
				<input
					id={id}
					name={name}
					type={type}
					defaultValue={defaultValue}
					value={value}
					disabled={disabled}
					required={required}
					placeholder={placeholder}
					onChange={onChange}
				/>
			)}
		</>
	);
};

export default InputText;
