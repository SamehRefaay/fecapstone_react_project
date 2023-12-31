import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

const ConsultationForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
	const nameRef = useRef();
	const [name, setName] = useState('');
	const [validName, setValidName] = useState(false);
	const [nameFocus, setNameFocus] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState('');
	const [validPhone, setValidPhone] = useState(false);
	const [phoneFocus, setPhoneFocus] = useState(false);

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
			const consultationData = {
				name,
				phoneNumber,
			};

			localStorage.setItem('doctorData', JSON.stringify(doctorData));

			const data = JSON.parse(window.localStorage.getItem(doctorName));

			if (data) {
				window.localStorage.setItem(
					doctorName,
					JSON.stringify({ ...data, consultation: consultationData })
				);
			} else {
				localStorage.setItem(
					doctorName,
					JSON.stringify({ consultation: consultationData })
				);
			}

			onSubmit(consultationData);
			setName('');
			setPhoneNumber('');
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
			<button type="submit" disabled={!validName || !validPhone}>
				Book Now
			</button>
		</form>
	);
};

export default ConsultationForm;
