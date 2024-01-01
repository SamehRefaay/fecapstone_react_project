import React, { useEffect, useState } from 'react';
import './ReviewForm.css';
import Popup from 'reactjs-popup';
import GiveReviews from '../GiveReviews/GiveReviews';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewForm = () => {
	const [showModal, setShowModal] = useState(false);
	const [consultationList, setConsultationList] = useState([]);
	useEffect(() => {
		const list = JSON.parse(window.localStorage.getItem('consultation-list'));
		console.log('list', list);
		if (list) {
			setConsultationList(list);
		}
	}, []);

	const handleOnSubmit = feedbackData => {
		//update consultation list with new reviews
		consultationList[feedbackData.index] = feedbackData;
		window.localStorage.setItem(
			'consultation-list',
			JSON.stringify(consultationList)
		);
	};

	return (
		<div className="reviews">
			<div className="container">
				<h2>Reviews</h2>
				<table>
					<tr>
						<th>S.NO.</th>
						<th>Doctor Name</th>
						<th>Doctor Speciality</th>
						<th>Provide Review</th>
						<th>Review Given</th>
					</tr>
					{consultationList.map((item, index) => (
						<tr>
							<td>{index + 1}</td>
							<td>{item.name}</td>
							<td>{item.speciality}</td>
							<td>
								<Popup
									style={{ backgroundColor: 'red' }}
									trigger={<button disabled={item.review}>Give Review</button>}
									modal
									open={showModal}
									onClose={() => setShowModal(false)}
								>
									{close => (
										<GiveReviews
											doctor={item}
											index={index}
											onSubmit={handleOnSubmit}
										/>
									)}
								</Popup>
							</td>

							<td>
								<>
									{item.review && (
										<Rating
											emptySymbol={
												<FontAwesomeIcon icon={faStar} color="#ccc" />
											}
											fullSymbol={
												<FontAwesomeIcon icon={faStar} color="#fed100" />
											}
											readonly
											initialRating={item.rating}
										/>
									)}

									<p>{item.review}</p>
								</>
							</td>
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
		</div>
	);
};

export default ReviewForm;
