import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
// import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

import male1 from '../../assets/images/male-doctor1.jpeg';
import male2 from '../../assets/images/male-doctor2.jpeg';
import male3 from '../../assets/images/male-doctor3.jpeg';
import male4 from '../../assets/images/male-doctor4.jpeg';
import female1 from '../../assets/images/female-doctor1.jpeg';
import female2 from '../../assets/images/female-doctor2.jpeg';
import female3 from '../../assets/images/female-doctor3.jpeg';
import female4 from '../../assets/images/female-doctor4.jpeg';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
	const [showModal, setShowModal] = useState(false);
	const [appointments, setAppointments] = useState([]);

	const handleBooking = () => {
		setShowModal(true);
	};

	const handleCancel = appointmentId => {
		const updatedAppointments = appointments.filter(
			appointment => appointment.id !== appointmentId
		);
		setAppointments(updatedAppointments);
	};

	const handleFormSubmit = appointmentData => {
		const newAppointment = {
			id: uuidv4(),
			...appointmentData,
		};
		const updatedAppointments = [...appointments, newAppointment];
		setAppointments(updatedAppointments);
		setShowModal(false);
	};
	//  'jiao'||'jessica'||'sarah'||'stephny'||'Elizabeth'||'Emily'||samantha||rachel
	const getDoctorImage = name => {
		var doctorsImages = [];
		const i = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
		if (
			name.toLowerCase().includes('jiao') ||
			name.toLowerCase().includes('jessica') ||
			name.toLowerCase().includes('sarah') ||
			name.toLowerCase().includes('stephny') ||
			name.toLowerCase().includes('elizabeth') ||
			name.toLowerCase().includes('emily') ||
			name.toLowerCase().includes('samantha') ||
			name.toLowerCase().includes('rachel')
		) {
			doctorsImages = [female1, female2, female3, female4];
			return doctorsImages[i];
		}
		doctorsImages = [male1, male2, male3, male4];
		return doctorsImages[i];
	};

	return (
		<div className="doctor-card-container">
			<div className="doctor-card-details-container">
				<div className="doctor-card-profile-image-container">
					<img src={getDoctorImage(name)} alt="" />
				</div>
				<div className="doctor-card-details">
					<div className="doctor-card-detail-name">{name}</div>
					<div className="doctor-card-detail-speciality">{speciality}</div>
					<div className="doctor-card-detail-experience">
						{experience} years experience
					</div>
					<div className="doctor-card-detail-consultationfees">
						Ratings: {ratings}
					</div>
				</div>
				{/* for reference  */}
				{/* <div>
					<button className="book-appointment-btn">
						<div>Book Appointment</div>
						<div>No Booking Fee</div>
					</button>
				</div> */}
			</div>

			<div className="doctor-card-options-container">
				<Popup
					style={{ backgroundColor: '#FFFFFF' }}
					trigger={
						<button
							className={`book-appointment-btn ${
								appointments.length > 0 ? 'cancel-appointment' : ''
							}`}
						>
							{appointments.length > 0 ? (
								<div>Cancel Appointment</div>
							) : (
								<div>Book Appointment</div>
							)}
							<div>No Booking Fee</div>
						</button>
					}
					modal
					open={showModal}
					onClose={() => setShowModal(false)}
				>
					{close => (
						<div
							className="doctorbg"
							style={{ height: '100vh', overflow: 'scroll' }}
						>
							<div>
								<div className="doctor-card-profile-image-container">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="46"
										height="46"
										fill="currentColor"
										class="bi bi-person-fill"
										viewBox="0 0 16 16"
									>
										{' '}
										<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{' '}
									</svg>
								</div>
								<div className="doctor-card-details">
									<div className="doctor-card-detail-name">{name}</div>
									<div className="doctor-card-detail-speciality">
										{speciality}
									</div>
									<div className="doctor-card-detail-experience">
										{experience} years experience
									</div>
									<div className="doctor-card-detail-consultationfees">
										Ratings: {ratings}
									</div>
								</div>
							</div>

							{appointments.length > 0 ? (
								<>
									<h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
									{appointments.map(appointment => (
										<div className="bookedInfo" key={appointment.id}>
											<p>Name: {appointment.name}</p>
											<p>Phone Number: {appointment.phoneNumber}</p>
											<button onClick={() => handleCancel(appointment.id)}>
												Cancel Appointment
											</button>
										</div>
									))}
								</>
							) : (
								{
									/* <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} /> */
								}
							)}
						</div>
					)}
				</Popup>
			</div>
		</div>
	);
};

export default DoctorCard;
