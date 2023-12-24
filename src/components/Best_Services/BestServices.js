import React from 'react';
import './BestServices.css';
import { Link } from 'react-router-dom';

const BestServices = () => {
	return (
		<div className="best-services-container">
			<h3>Best Services</h3>
			<p className="qoute">
				Love your self enough to live a healthy lifestyle.
			</p>
			<div className="services-container">
				<div className="service-card">
					<Link to="/instant-consultation">
						<img
							src="https://img.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_23-2148856559.jpg?w=740&t=st=1702746666~exp=1702747266~hmac=e3fbe7cf0f0c0857a9f1349ca0c61c1fb2a8106dffa71aafc1462d33d6f7406d"
							alt="instant-consultation"
						/>
						<div style={{ margin: '15px', fontWeight: 600, fontSize: '14px' }}>
							<span>Instant Consultaiton</span>
						</div>
					</Link>
				</div>

				<div className="service-card">
					<Link to="/appointment-booking">
						<img
							src="https://img.freepik.com/premium-vector/personal-doctor-appointment-2d-vector-isolated-illustration-visit-professional-health-facility-flat-characters-cartoon-background-getting-treatment-plan-symptoms-conditions-colourful-scene_151150-5797.jpg"
							alt="Book an Appointment"
						/>
						<div style={{ margin: '15px', fontWeight: 600, fontSize: '14px' }}>
							<span>Book an Appointment</span>
						</div>
					</Link>
				</div>
				<div className="service-card">
					<Link to="#">
						<img
							src="https://img.freepik.com/free-vector/hospital-service-concept-flat-illustration_1150-50287.jpg?w=740&t=st=1702749306~exp=1702749906~hmac=0c5f7b7c0f389feaf083ea9460dce3150ee5288f46313dd8b038f4bce08c35e2"
							alt="Self Checkup"
						/>
						<div style={{ margin: '15px', fontWeight: 600, fontSize: '14px' }}>
							<span>Self Checkup</span>
						</div>
					</Link>
				</div>
				<div className="service-card">
					<Link to="#">
						<img
							src="https://img.freepik.com/premium-vector/female-artist-watching-museum-exhibition-online-guide-computer-screen-presenting-exhibits-flat-vector-illustration-technology-online-gallery-concept-banner-website-design-landing-page_179970-5619.jpg"
							alt="Health Tips and Guidance"
						/>
						<div style={{ margin: '15px', fontWeight: 600, fontSize: '14px' }}>
							<span>Health Tips and Guidance</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BestServices;
