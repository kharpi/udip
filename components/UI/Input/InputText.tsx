import React from 'react';
import { IInputText } from '../../../interfaces/Input.interface';
import { IInputChange } from '../../../interfaces/InputChange.interface';

type ITextInputProps = Omit<IInputText, 'type'> & {
	onChange: (e: IInputChange) => void;
	type?: string;
	style?: React.CSSProperties;
};

const InputText = (props: ITextInputProps): React.ReactElement => {
	const wrapperStyle: string[] = ['input__wrapper'];

	if (props.hidden) wrapperStyle.push('hidden');
	if (props.className) wrapperStyle.push(props.className);

	return (
		<div className={wrapperStyle.join(' ')} style={props.style}>
			<label htmlFor={props.id}>{props.labelText}</label>
			<input
				type={props.type}
				id={props.id}
				value={props.value}
				required={props.required}
				disabled={props.disabled}
				pattern={props.pattern}
				placeholder={props.placeholder}
				onChange={(e) => {
					props.onChange({
						fieldName: props.id,
						value: e.target.value,
					});
				}}
			/>
		</div>
	);
};

export default InputText;
