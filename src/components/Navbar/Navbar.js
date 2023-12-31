import { useState, useEffect, React } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [showProfileDropMenu, setShowProfileDropMenu] = useState(false);
	// const [openDropMenu, setOpenDropMenu] = useState(true);

	useEffect(() => {
		const isMobile = window.innerWidth;
		console.log(isMobile);

		const storedUsername = sessionStorage.getItem('email');
		if (storedUsername) {
			setIsLoggedIn(true);
			setUserName(storedUsername.split('@')[0]);
		}
	}, []);

	const handleLogout = () => {
		// sessionStorage.removeItem('auth-token');
		// sessionStorage.removeItem('name');
		// sessionStorage.removeItem('email');
		// sessionStorage.removeItem('phone');
		console.log('logout');
		sessionStorage.clear();
		setIsLoggedIn(false);
		setUserName('');
		window.location.reload();
	};

	return (
		<>
			<nav>
				<div className="container">
					<div className="nav__logo">
						<a href="/">
							StayHealthy
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="26"
								width="26"
								viewBox="0 0 1000 1000"
								style={{ fill: '#3685fb' }}
							>
								<title>Doctor With Stethoscope SVG icon</title>
								<g>
									<g>
										<path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
										<path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
										<path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44.4,77.2-89.2v-158c-90.5-15.2-160.1-94-160.8-188.9c-89.4,11.5-158.2,87.9-158.2,180.5V910c0,44.2,35.8,80,80,80h542.6c44.2,0,80.1-35.8,80.1-80V575.5C851.4,483,782.6,406.6,693.2,395z"></path>
									</g>
								</g>
							</svg>
						</a>
						<span>.</span>
					</div>
					<div className="nav__icon">
						<i className="fa fa-times fa fa-bars"></i>
					</div>
					<ul className={'nav__links active'}>
						<li className="link">
							<Link to="/best-services">Home</Link>
						</li>
						<li className="link">
							<Link to="">Appointment</Link>
						</li>
						<li className="link">
							<Link to="#">Health Blog</Link>
						</li>
						<li className="link">
							<Link to="/reviews">Reviews</Link>
						</li>
						{isLoggedIn ? (
							<>
								<div
									className="profile-username"
									onClick={() => setShowProfileDropMenu(!showProfileDropMenu)}
								>
									<p>
										Welcome, <span>{userName}</span>
									</p>
									{showProfileDropMenu && (
										<ul className="profile-drop-down-menu">
											<li>
												<Link to="/profile">Your Profile</Link>
											</li>
											<li>
												<Link to="/reports">Your Reports</Link>
											</li>
										</ul>
									)}
								</div>
								<li className="link">
									<button onClick={handleLogout} className="btn1">
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className="link">
									<Link to="/signup">
										<button className="btn1">Sign Up</button>
									</Link>
								</li>
								<li className="link">
									<Link to="/login">
										<button className="btn1">Login</button>
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
