import React, { useEffect, useState } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import { useSearchParams } from 'react-router-dom';
import DoctorCard from '../DoctorCard/DoctorCard';

const AppointmentBooking = () => {
	const [searchParams] = useSearchParams();
	const [doctors, setDoctors] = useState([]);
	const [filteredDoctors, setFilteredDoctors] = useState([]);
	const [isSearched, setIsSearched] = useState(false);

	const getDoctorsDetails = () => {
		console.log('iside get doctors');
		console.log('doctors details fun invoke');
		fetch('https://api.npoint.io/9a5543d36f1460da2f63')
			.then(res => res.json())
			.then(data => {
				if (searchParams.get('speciality')) {
					// data.filter((doctor)));
					console.log(data);
					const filtered = data.filter(
						doctor =>
							doctor.speciality.toLowerCase() ===
							searchParams.get('speciality').toLowerCase()
					);
					setFilteredDoctors(filtered);
					setIsSearched(true);
					window.reload();
				} else {
					setFilteredDoctors([]);
					setIsSearched(false);
				}
				setDoctors(data);
			})
			.catch(e => console.log(e));
	};

	const handleSearch = searchText => {
		if (searchText === '') {
			setFilteredDoctors([]);
			setIsSearched(false);
		} else {
			const filtered = doctors.filter(doctor =>
				//
				doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
			);

			setFilteredDoctors(filtered);
			setIsSearched(true);
			window.location.reload();
		}
	};
	useEffect(() => {
		getDoctorsDetails();
		console.log(doctors);
	}, [searchParams]);

	return (
		<>
			<FindDoctorSearch onSearch={handleSearch} />
			<div className="container">
				<div className="search-results-container">
					{isSearched ? (
						<center>
							<h2>
								{filteredDoctors.length} doctors are available{' '}
								{searchParams.get('location')}
							</h2>
							<h3>
								Book appointments with minimum wait-time & verified doctor
								details
							</h3>

							{filteredDoctors.length > 0 ? (
								filteredDoctors.map(doctor => (
									<DoctorCard
										className="doctorcard"
										{...doctor}
										key={doctor.name}
									/>
								))
							) : (
								<p>No doctors found.</p>
							)}
						</center>
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
};

export default AppointmentBooking;
