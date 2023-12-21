import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const initSpeciality = [
	'Dentist',
	'Gynecologist/obstetrician',
	'General Physician',
	'Dermatologist',
	'Ear-nose-throat (ent) Specialist',
	'Homeopath',
	'Ayurveda',
];

const FindDoctorSearch = () => {
	const [doctorResultHidden, setDoctorResultHidden] = useState(true);
	const [searchDoctor, setSearchDoctor] = useState('');
	const [specialities, setSpecialities] = useState(initSpeciality);
	const navigate = useNavigate();
	const handleDoctorSelect = speciality => {
		setSearchDoctor(speciality);
		setDoctorResultHidden(true);
		navigate(`/appointment-booking?speciality=${speciality}`);
		window.location.reload();
	};
	const handleOnChange = e => {
		setSearchDoctor(e.target.value);
		// implement instant filter search
		// const matchedSpeciality = initSpeciality.filter(speciality =>
		// 	speciality.toLowerCase().includes(searchDoctor.toLowerCase())
		// );
		// setSpecialities(matchedSpeciality);
	};
	return (
		<div className="find-doctor">
			<div className="container">
				<h3>Find a doctor at your own ease</h3>
				<img
					src="https://cdn4.iconfinder.com/data/icons/medical-flat-sticker-icons-part-1/202/Search_Doctor-512.png"
					alt="search for a doctor"
				/>
				<div className="search-container">
					<div className="search-bar">
						<input
							type="text"
							placeholder="Search doctors, clinics, hospitals, etc"
							// value={searchDoctor}
							onChange={e => handleOnChange}
							onFocus={() => setDoctorResultHidden(false)}
							onBlur={() => setDoctorResultHidden(true)}
						/>
						<button>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</div>
					<div className="suggested-list" hidden={doctorResultHidden}>
						{specialities.map(speciality => (
							<div
								className="suggested-list-item"
								style={{ fontSize: '14px' }}
								key={speciality}
								onMouseDown={() => handleDoctorSelect(speciality)}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										gap: '10px',
									}}
								>
									<span
										style={{
											display: 'inline-flex',
											justifyContent: 'center',
											alignItems: 'center',
											width: '30px',
											height: '30px',
											borderRadius: '50%',
											backgroundColor: '#ccc',
										}}
									>
										<FontAwesomeIcon icon={faSearch} />
									</span>
									<span>{speciality}</span>
								</div>
								<span style={{ fontSize: '12px' }}>SPECIALITY</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FindDoctorSearch;
