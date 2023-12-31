import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
	const [consultationList, setConsultationList] = useState([]);
	useEffect(() => {
		const list = JSON.parse(window.localStorage.getItem('consultation-list'));
		if (list) {
			setConsultationList(list);
		}
	}, []);

	return (
		<div className="reviews">
			<h2>Reviews</h2>
			<table>
				<tr>
					<th>S.NO.</th>
					<th>Doctor Name</th>
					<th>Doctor Speciality</th>
					<th>Provide Review</th>
					<th>Review Given</th>
				</tr>
				{consultationList.map((doctor, index) => (
					<tr>
						<td>{++index}</td>
						<td>{doctor.name}</td>
						<td>{doctor.speciality}</td>
						<td>
							<button>Give Review</button>
						</td>
						<td>{}</td>
					</tr>
				))}
			</table>
			{consultationList.length === 0 && (
				<p style={{ marginTop: '10px', padding: '5px', color: '#777' }}>
					{' '}
					You did not consult any to review!
				</p>
			)}
		</div>
	);
};

export default ReviewForm;
