import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const ProfileCard = () => {
	const [user, setUser] = useState({});
	const [updatedUser, setUpdatedUser] = useState({});
	const [editMode, setEditMode] = useState(false);
	const navigate = useNavigate();

	const fetchUserDetails = async () => {
		try {
			const authtoken = sessionStorage.getItem('auth-token');
			const email = sessionStorage.getItem('email');

			if (!authtoken) {
				navigate('/login');
			} else {
				const response = await fetch(`${API_URL}/api/auth/user`, {
					headers: {
						Authorization: `Bearer ${authtoken}`,
						Email: email,
					},
				});

				if (response.ok) {
					const user = await response.json();
					setUser(user);
					setUpdatedUser(user);
				} else {
					throw new Error('Failed to fetch user profile');
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const authtoken = sessionStorage.getItem('auth-token');
		if (!authtoken) {
			navigate('/login');
		} else {
			fetchUserDetails();
		}
	}, [navigate]);

	const handleOnSubmit = async e => {
		e.preventDefault();
		try {
			const authtoken = sessionStorage.getItem('auth-token');
			const email = sessionStorage.getItem('email');
			if (!authtoken || !email) {
				navigate('/login');
				return;
			} else {
				const payload = { ...updatedUser };
				const response = await fetch(`${API_URL}/api/auth/user`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${authtoken}`,
						'Content-Type': 'application/json',
						Email: email,
					},
					body: JSON.stringify(payload),
				});
				if (response.ok) {
					sessionStorage.setItem('name', updatedUser.name);
					sessionStorage.setItem('phone', updatedUser.phone);
					setUser(updatedUser);
					setEditMode(false);
					alert(`Profile Updated Successfully!`);
					navigate('/');
				} else {
					throw new Error('Failed to update profile.');
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="profile-page">
			<div className="profile-container">
				{editMode ? (
					<form onSubmit={handleOnSubmit} className="profile-form">
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" value={user.email} disabled />
						</div>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								id="name"
								type="text"
								value={updatedUser.name}
								onChange={e =>
									setUpdatedUser({ ...updatedUser, name: e.target.value })
								}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input
								id="phone"
								type="text"
								value={updatedUser.phone}
								onChange={e =>
									setUpdatedUser({ ...updatedUser, phone: e.target.value })
								}
							/>
						</div>
						<button type="submit">Save</button>
					</form>
				) : (
					<div className="profile-details">
						<h1>Welcome, {user.name}</h1>
						<p>
							<strong>Email: </strong> {user.email}
						</p>
						<p>
							<strong>Phone: </strong> {user.phone}
						</p>
						<button onClick={() => setEditMode(true)}>Edit</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileCard;
