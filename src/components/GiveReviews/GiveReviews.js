import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Rating from 'react-rating';

const GiveReviews = ({ index, doctor, onSubmit }) => {
	const [patientName, setPatiantName] = useState('');
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);

	const handleFormSubmit = e => {
		e.preventDefault();
		onSubmit({
			index,
			name: doctor.name,
			speciality: doctor.speciality,
			patientName,
			review,
			rating,
		});
		setPatiantName('');
		setReview('');
		window.location.reload();
	};

	return (
		<div style={{ padding: '50px 0' }}>
			<center>
				<div
					style={{
						maxWidth: '350px',
						backgroundColor: '#eee',
						padding: '20px',
					}}
				>
					<h3>Give Your Feedback</h3>
					<form onSubmit={handleFormSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name:</label>
							<input
								required
								id="name"
								type="text"
								value={patientName}
								onChange={e => setPatiantName(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label html>Review:</label>
							<textarea
								required
								id="review"
								type="text"
								value={review}
								onChange={e => setReview(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Rating</label>
							<Rating
								value={rating}
								className="rating"
								emptySymbol={<FontAwesomeIcon icon={faStar} />}
								fullSymbol={<FontAwesomeIcon icon={faStar} color="#fed100" />}
								onChange={value => setRating(value)}
							/>
						</div>
						<button type="submit">Submit</button>
					</form>
				</div>
			</center>
		</div>
	);
};

export default GiveReviews;
