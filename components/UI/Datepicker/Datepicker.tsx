import React from 'react';
import DatePickerReact from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { IInputChange } from '../../../interfaces/InputChange.interface';
import { IInputDate } from '../../../interfaces/Input.interface';
import { dateStringToDate } from '../../../utils/dateStringToDate.util';

type IDateType = string | Date | number | null;

const parseDate = (originalDate: IDateType): Date | null => {
	if (originalDate === '') return null;
	if (originalDate instanceof Date) return originalDate;
	if (typeof originalDate === 'string') {
		return dateStringToDate(originalDate);
	}
	if (typeof originalDate === 'number') return new Date(originalDate);
	return null;
};

interface IProps extends IInputDate {
	onChange: (e: IInputChange) => void;
	deleteInput?: (id: string) => any;
	dateParser?: (dateString: IDateType) => Date | null;
}

export const Datepicker = (props: IProps) => {
	const wrapperStyle: string[] = ['input__wrapper'];
	const value: Date | null = props.dateParser
		? props.dateParser(props.value)
		: parseDate(props.value);

	if (props.hidden) wrapperStyle.push('wrapper-hidden');
	if (props.disabled) wrapperStyle.push('disabled-date-wrapper');
	if (props.className) wrapperStyle.push(props.className);

	const minDate: Date = props.minDate
		? props.minDate
		: new Date(1930, 1, 1, 0, 0, 0, 1);

	const getDateFormat = () => {
		if (props.dtFormat) return props.dtFormat;
		if (props.showTime) return 'yyyy. MMMM, dd. - HH:mm';
		return 'yyyy. MM. dd.';
	};

	return (
		<div className={wrapperStyle.join(' ')}>
			<label>{props.labelText}</label>
			<DatePickerReact
				fixedHeight
				showYearDropdown
				minDate={minDate}
				timeFormat='HH:mm'
				locale={props.locale}
				scrollableYearDropdown
				className={'date-picker'}
				disabled={props.disabled}
				dateFormatCalendar={'MMMM'}
				yearDropdownItemNumber={3}
				dateFormat={getDateFormat()}
				selected={value ? value : null}
				isClearable={props.isClearable}
				showTimeSelect={props.showTime}
				placeholderText={props.placeholder}
				showTimeSelectOnly={props.showTimeSelectOnly}
				maxDate={props.maxDate ? props.maxDate : undefined}
				withPortal={props.withPortal}
				timeIntervals={props.timeInterval ? props.timeInterval : 30}
				timeCaption={props.timeCaption || 'Time'}
				onChangeRaw={(e: any) => {
					e.preventDefault();
					return;
				}}
				onChange={(return_value: Date) => {
					props.onChange({
						value: return_value,
						fieldName: props.id,
					});
				}}
			/>
			{props.description ? (
				<p className='input-description'>{props.description}</p>
			) : null}
			{props.warningText ? (
				<p className='input-warning'>{props.warningText}</p>
			) : null}
		</div>
	);
};
