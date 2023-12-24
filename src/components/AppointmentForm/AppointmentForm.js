import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

	const handleSlotSelection = e => {
		setSelectedSlot(e.target.value);
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		onSubmit({ name, phoneNumber, startDate, selectedSlot });
		setName('');
		setPhoneNumber('');
		setStartDate(new Date());
		setSelectedSlot(null);
	};

	return (
		<form onSubmit={handleFormSubmit} className="appointment-form">
			<div className="form-group">
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="phoneNumber">Phone Number:</label>
				<input
					type="tel"
					id="phoneNumber"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="datePicker">Date of Appointment:</label>
				<DatePicker
					locale="es"
					style={{ width: '100%' }}
					selected={startDate}
					onChange={date => {
						setStartDate(date);
						console.log(startDate);
					}}
					// onSelect={date => setStartDate(date)}
				/>
			</div>

			<div lassName="form-group">
				<label htmlFor="timePicker">Time of Appointment:</label>
				<select
					style={{ fontSize: '16px', width: '100%' }}
					onSelect={handleSlotSelection}
					value={selectedSlot}
					placeholder="Select Time Slot"
				>
					<option value="01:00 AM">01:00 AM</option>
					<option value="02:00 AM">02:00 AM</option>
					<option value="03:00 AM">03:00 AM</option>
					<option value="04:00 AM">04:00 AM</option>
					<option value="05:00 AM">05:00 AM</option>
					<option value="06:00 AM">06:00 AM</option>
					<option value="07:00 AM">07:00 AM</option>
					<option value="08:00 AM">08:00 AM</option>
					<option value="09:00 AM">09:00 AM</option>
					<option value="10:00 AM">10:00 AM</option>
					<option value="11:00 AM">11:00 AM</option>
					<option value="12:00 PM">12:00 PM</option>
					<option value="01:00 PM">01:00 PM</option>
					<option value="02:00 PM">02:00 PM</option>
					<option value="03:00 PM">03:00 PM</option>
					<option value="04:00 PM">04:00 PM</option>
					<option value="05:00 PM">05:00 PM</option>
					<option value="06:00 PM">06:00 PM</option>
					<option value="07:00 PM">07:00 PM</option>
					<option value="08:00 PM">08:00 PM</option>
					<option value="09:00 PM">09:00 PM</option>
					<option value="10:00 PM">10:00 PM</option>
					<option value="11:00 PM">11:00 PM</option>
					<option value="12:00 AM">12:00 AM</option>
				</select>
			</div>

			<button type="submit">Book Now</button>
		</form>
	);
};

export default AppointmentForm;
