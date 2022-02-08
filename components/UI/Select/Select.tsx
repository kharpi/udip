import React, { useEffect, useState } from 'react';
import { IInputSelect } from '../../../interfaces/Input.interface';
import { IInputChange } from '../../../interfaces/InputChange.interface';
import ReactSelect from 'react-select';
import { InputDefaults } from './InputDefaults';

type ILocalProps<T> = IInputSelect<T> & {
	onChange: (e: IInputChange) => void;
};

const Select: React.FC<ILocalProps<any>> = (props): React.ReactElement => {
	const [texts, set_texts] = useState(InputDefaults.Select);
	const label: React.ReactNode = props.labelText;
	const wrapperStyle: string[] = ['input__wrapper'];

	useEffect(
		() => {
			set_texts(InputDefaults.Select);
		},
		//eslint-disable-next-line
		[InputDefaults.Select]
	);

	if (props.wrapperClass) wrapperStyle.push(props.wrapperClass);
	if (props.disabled) wrapperStyle.push('disabled-select-wrapper');
	if (props.hidden) wrapperStyle.push('wrapper-hidden');

	let options = props.options;

	if (props.sortOption !== undefined) {
		options.sort((a, b) => {
			if (props.sortOption) props.sortOption(a, b);
			return 0;
		});
	}
	return (
		<div className={wrapperStyle.join(' ')}>
			<label htmlFor={props.id} className='input-label'>
				{label}
			</label>
			<ReactSelect
				instanceId={props.id}
				value={props.value}
				options={options}
				menuIsOpen={props.menuIsOpen}
				onChange={(value: any) => {
					props.onChange({
						fieldName: props.id,
						value: value,
					});
				}}
				isMulti={props.isMulti}
				isClearable={props.isClearable}
				className={`customSelect ${props.className || ''}`}
				classNamePrefix={`select-input--internals ${
					props.classNamePrefix || ''
				}`}
				isDisabled={props.disabled}
				closeMenuOnSelect={props.closeMenuOnSelect}
				closeMenuOnScroll={props.closeMenuOnScroll}
				escapeClearsValue={props.escapeClearsValue}
				filterOption={props.filterOption}
				isLoading={props.isLoading}
				getOptionLabel={(option: any) => option[props.nameAccessor || 'name']}
				getOptionValue={(option: any) => option[props.idAccessor || 'id']}
				placeholder={props.placeholder || texts.placeholder}
			/>
			{props.children}
		</div>
	);
};

export default Select;
