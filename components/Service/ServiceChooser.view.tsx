import React from 'react';
import { IServiceFormStart } from '../../interfaces/forms/ServiceForm.interface';
import { IInputChange } from '../../interfaces/InputChange.interface';
import Select from '../UI/Select/Select';

type Props = {
	form: IServiceFormStart;
	onChange: (args: IInputChange) => void;
};

const ServiceChooser = ({ form, onChange }: Props) => {
	return (
		<div>
			<h1>Services</h1>
			<form>
				<Select {...form.company} onChange={onChange} wrapperClass='span2' />
			</form>
		</div>
	);
};

export default ServiceChooser;
