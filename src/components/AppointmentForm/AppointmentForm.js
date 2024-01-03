import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const timeOptions = [
	{ label: '01:00 AM', value: '01:00 AM' },
	{ label: '02:00 AM', value: '02:00 AM' },
	{ label: '03:00 AM', value: '03:00 AM' },
	{ label: '04:00 AM', value: '04:00 AM' },
	{ label: '05:00 AM', value: '05:00 AM' },
	{ label: '06:00 AM', value: '06:00 AM' },
	{ label: '07:00 AM', value: '07:00 AM' },
	{ label: '08:00 AM', value: '08:00 AM' },
	{ label: '09:00 AM', value: '09:00 AM' },
	{ label: '10:00 AM', value: '10:00 AM' },
	{ label: '11:00 AM', value: '11:00 AM' },
	{ label: '12:00 PM', value: '12:00 PM' },
	{ label: '01:00 PM', value: '01:00 PM' },
	{ label: '02:00 PM', value: '02:00 PM' },
	{ label: '03:00 PM', value: '03:00 PM' },
	{ label: '04:00 PM', value: '04:00 PM' },
	{ label: '05:00 PM', value: '05:00 PM' },
	{ label: '06:00 PM', value: '06:00 PM' },
	{ label: '07:00 PM', value: '07:00 PM' },
	{ label: '08:00 PM', value: '08:00 PM' },
	{ label: '09:00 PM', value: '09:00 PM' },
	{ label: '10:00 PM', value: '10:00 PM' },
	{ label: '11:00 PM', value: '11:00 PM' },
	{ label: '12:00 AM', value: '12:00 AM' },
];

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
	const nameRef = useRef();
	const [name, setName] = useState('');
	const [validName, setValidName] = useState(false);
	const [nameFocus, setNameFocus] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState('');
	const [validPhone, setValidPhone] = useState(false);
	const [phoneFocus, setPhoneFocus] = useState(false);

	const [startDate, setStartDate] = useState(new Date());

	const [selectedSlot, setSelectedSlot] = useState('08:00 AM');

	const NAME_REGEX = /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]$/;
	const PHONE_REGEX = /\d/;

	useEffect(() => {
		const result = NAME_REGEX.test(name) && name.length !== 0;
		setValidName(result);
	}, [name]);

	useEffect(() => {
		const result = PHONE_REGEX.test(phoneNumber) && phoneNumber.length === 10;
		setValidPhone(result);
	}, [phoneNumber]);

	const handleFormSubmit = e => {
		e.preventDefault();

		const v1 = NAME_REGEX.test(name) && name.length !== 0;
		const v2 = PHONE_REGEX.test(phoneNumber) && phoneNumber.length === 10;

		if (!v1 || !v2) {
			return;
		} else {
			const doctorData = {
				name: doctorName,
				speciality: doctorSpeciality,
			};
			const appointmentData = {
				name,
				phoneNumber,
				startDate,
				selectedSlot,
			};

			localStorage.setItem('doctorData', JSON.stringify(doctorData));

			const data = JSON.parse(window.localStorage.getItem(doctorName));

			if (data) {
				window.localStorage.setItem(
					doctorName,
					JSON.stringify({ ...data, appointment: appointmentData })
				);
			} else {
				localStorage.setItem(
					doctorName,
					JSON.stringify({ appointment: appointmentData })
				);
			}

			onSubmit(appointmentData);
			setName('');
			setPhoneNumber('');
			setStartDate(new Date());
			setSelectedSlot(null);
			window.location.reload();
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className="appointment-form">
			<div className="form-group">
				<label htmlFor="name">
					Name:
					<span className={validName ? 'valid' : 'hide'}>
						<FontAwesomeIcon icon={faCheck} color="green" />
					</span>
					<span className={validName || !name ? 'hide' : 'invalid'}>
						<FontAwesomeIcon icon={faTimes} color="red" />
					</span>
				</label>
				<input
					ref={nameRef}
					id="name"
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
					onFocus={e => setNameFocus(true)}
					onBlur={e => setNameFocus(false)}
					required
					aria-invalid={validName ? false : true}
					aria-describedby="namenote"
				/>
				<p
					id="namenote"
					className={nameFocus && !validName ? 'instructions' : 'offscreen'}
				>
					Name can't be empty. <br />
					Name can't start with space <br />
					Number, hyphen, underscore and a special characters <br /> like{' '}
					<span aria-label="exclamation mark">!</span>
					<span aria-label="at symbol">@</span>
					<span aria-label="hashtag">#</span>
					<span aria-label="doller sign">$</span>
					<span aria-label="percent">%</span> not Allowed.
				</p>
			</div>
			<div className="form-group">
				<label htmlFor="phoneNumber">
					Phone Number:
					<span className={validPhone ? 'valid' : 'hide'}>
						<FontAwesomeIcon icon={faCheck} color="green" />
					</span>
					<span className={validPhone || !phoneNumber ? 'hide' : 'invalid'}>
						<FontAwesomeIcon icon={faTimes} color="red" />
					</span>
				</label>
				<input
					type="tel"
					id="phoneNumber"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
					onFocus={e => setPhoneFocus(true)}
					onBlur={e => setPhoneFocus(false)}
					required
					aria-invalid={validPhone ? false : true}
					aria-describedby="phonenote"
				/>
				<p
					id="phonenote"
					className={
						phoneNumber && phoneFocus && !validPhone
							? 'instructions'
							: 'offscreen'
					}
				>
					please enter only 10 digits for the phone number.
				</p>
			</div>
			<div className="form-group">
				<label htmlFor="datePicker">Date of Appointment:</label>
				<DatePicker
					style={{ width: '100%' }}
					selected={startDate}
					minDate={new Date()}
					onChange={date => {
						setStartDate(date);
						console.log(startDate);
					}}
				/>
			</div>

			<div lassName="form-group">
				<label htmlFor="timePicker">Time of Appointment:</label>
				<select
					style={{ fontSize: '16px', width: '100%' }}
					onChange={e => setSelectedSlot(e.target.value)}
					value={selectedSlot}
					placeholder="Select Time Slot"
				>
					{timeOptions.map(option => (
						<option value={option.value}>{option.label}</option>
					))}
				</select>
			</div>

			<button type="submit" disabled={!validName || !validPhone}>
				Book Now
			</button>
		</form>
	);
};

export default AppointmentForm;
