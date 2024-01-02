import React, { useState } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
	const [user, setUser] = useState('');

	return (
		<div className="profile-container">
			<h1>Welcome {user.name}</h1>
			<p>
				<strong>Email: </strong> {user.email}
			</p>
			<p>
				<strong>Phone: </strong> {user.phone}
			</p>
			<button>Edit</button>
		</div>
	);
};

export default ProfileCard;
