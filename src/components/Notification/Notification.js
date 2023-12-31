import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const [doctorData, setDoctorData] = useState(null);
	const [appointmentData, setAppointmentData] = useState(null);

	useEffect(() => {
		const storedUsername = sessionStorage.getItem('email');
		const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
		const storedAppointmentData = JSON.parse(
			localStorage.getItem(storedDoctorData?.name)
		)?.appointment;

		if (storedUsername) {
			console.log(username);
			setIsLoggedIn(true);
			setUsername(storedUsername);
		}

		if (storedDoctorData) {
			console.log(storedDoctorData);
			setDoctorData(storedDoctorData);
		}

		if (storedAppointmentData) {
			setAppointmentData(storedAppointmentData);
		}
	}, []);

	return (
		<div>
			{/* <Navbar></Navbar> */}
			{children}
			{isLoggedIn && appointmentData && (
				<div className="notification-container">
					<h2 className="notification-title">Appointment Details</h2>
					<div className="notification-details">
						<p>
							<strong>Doctor: </strong>
							{doctorData?.name}
						</p>
						<p>
							<strong>Speciality: </strong>
							{doctorData?.speciality}
						</p>
						<p>
							<strong>Name: </strong>
							{appointmentData?.name}
						</p>
						<p>
							<strong>Phone Number: </strong>
							{appointmentData?.phoneNumber}
						</p>
						<p>
							<strong>Date of Appointment: </strong>
							{appointmentData?.startDate.split('T')[0]}
						</p>
						<p>
							<strong>Time Slot: </strong>
							{appointmentData?.selectedSlot}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Notification;
