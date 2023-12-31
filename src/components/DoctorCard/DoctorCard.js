import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import { getDoctorImage, getDateFormat } from '../Utils';
import ConsultationForm from '../ConsultationForm/ConsultationForm';

const DoctorCard = ({
	name,
	speciality,
	experience,
	ratings,
	profilePic,
	service,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [appointments, setAppointments] = useState([]);
	const [hasBooked, setHasBooked] = useState(false);

	useEffect(() => {
		const consultationData = JSON.parse(
			window.localStorage.getItem(name)
		)?.consultation;
		const appointmentData = JSON.parse(
			window.localStorage.getItem(name)
		)?.appointment;
		console.log('consultationData: ', consultationData);
		console.log('appointmentData: ', appointmentData);

		if (service.type === 'consultation' && consultationData) {
			setHasBooked(true);
		}

		if (service.type === 'appointment' && appointmentData) {
			setHasBooked(true);
		}
	}, []);

	const getConsultationData = () => {
		return JSON.parse(window.localStorage.getItem(name))?.consultation;
	};

	const getAppointmentData = () => {
		return JSON.parse(window.localStorage.getItem(name))?.appointment;
	};

	const handleBooking = () => {
		setShowModal(true);
	};

	const handleCancel = name => {
		// const updatedAppointments = appointments.filter(
		// 	appointment => appointment.id !== appointmentId
		// );
		// setAppointments(updatedAppointments);
		const data = JSON.parse(window.localStorage.getItem(name));
		if (data && service.type === 'appointment') {
			delete data.appointment;
			window.localStorage.setItem(name, JSON.stringify(data));
			removeEmptyObj(data);
			window.location.reload();
		} else {
			delete data.consultation;
			window.localStorage.setItem(name, JSON.stringify(data));
			removeEmptyObj(data);
			setHasBooked(false);
		}
		const consultationList = JSON.parse(
			window.localStorage.getItem('consultation-list')
		);

		const updatedConsultationList = consultationList.filter(
			item => item.name !== name
		);
		window.localStorage.setItem(
			'consultation-list',
			JSON.stringify(updatedConsultationList)
		);
		removeEmptyArray();
	};

	const removeEmptyArray = () => {
		const consultationList = JSON.parse(
			window.localStorage.getItem('consultation-list')
		);
		if (consultationList.length === 0) {
			window.localStorage.removeItem('consultation-list');
		}
	};

	const removeEmptyObj = data => {
		//check if we have any empty object to remove it from local storage
		if (Object.keys(data).length === 0) {
			window.localStorage.removeItem(name);
		}
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

	return (
		<div className="doctor-card-container">
			<div className="doctor-card-details-container">
				<div className="doctor-card-profile-image-container">
					<img src={getDoctorImage(name)} alt="doctor" />
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
			</div>

			<div className="doctor-card-options-container">
				<Popup
					style={{ backgroundColor: '#FFFFFF' }}
					trigger={
						<button
							className={`book-appointment-btn ${
								hasBooked ? 'cancel-appointment' : ''
							}`}
						>
							{hasBooked ? (
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
								<div
									className="doctor-info"
									style={
										service.type === 'appointment'
											? {
													display: 'flex',
													flex: 'wrap',
													maxWidth: '400px',
													margin: '10px auto',
													justifyContent: 'space-evenly',
													alignItems: 'center',
											  }
											: {
													display: 'flex',
													flexDirection: 'column',
													flex: 'wrap',
													gap: '10px',
													maxWidth: '400px',
													margin: '10px auto 20px',
													justifyContent: 'space-evenly',
													alignItems: 'center',
											  }
									}
								>
									<div
										className="doctor-card-profile-image-container"
										style={{
											borderRight:
												service.type === 'appointment'
													? '2px solid #eee'
													: 'none',
										}}
									>
										<img src={getDoctorImage(name)} alt="doctor" />
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
							</div>
							{hasBooked && service.type === 'appointment' ? (
								<>
									<h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
									<div
										className="bookedInfo"
										key={name}
										style={{ width: '300px', margin: '50px auto' }}
									>
										<p style={{ marginTop: '20px' }}>
											Name: {getAppointmentData()?.name}
										</p>
										<p style={{ marginTop: '20px' }}>
											Phone Number: {getAppointmentData()?.phoneNumber}
										</p>
										<p style={{ marginTop: '20px' }}>
											Date: {getDateFormat(getAppointmentData()?.startDate)}
										</p>
										<p style={{ marginTop: '20px' }}>
											Time: {getAppointmentData()?.selectedSlot}
										</p>
										<button onClick={() => handleCancel(name)}>
											Cancel Appointment
										</button>
									</div>
								</>
							) : hasBooked && service.type === 'consultation' ? (
								<>
									<h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
									<div
										className="bookedInfo"
										key={name}
										style={{
											width: '300px',
											margin: '30px auto',
											textAlign: 'center',
										}}
									>
										<p style={{ marginTop: '20px' }}>
											Name: {getConsultationData()?.name}
										</p>
										<p style={{ marginTop: '20px' }}>
											Phone Number: {getConsultationData()?.phoneNumber}
										</p>
										<button onClick={() => handleCancel(name)}>
											Cancel Appointment
										</button>
									</div>
								</>
							) : (
								<>
									{service.type === 'appointment' ? (
										<AppointmentForm
											doctorName={name}
											doctorSpeciality={speciality}
											onSubmit={handleFormSubmit}
										/>
									) : (
										<ConsultationForm
											doctorName={name}
											doctorSpeciality={speciality}
											onSubmit={handleFormSubmit}
										/>
									)}
								</>
							)}
						</div>
					)}
				</Popup>
			</div>
		</div>
	);
};

export default DoctorCard;
