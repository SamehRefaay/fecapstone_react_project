import React from 'react';
import './Sign_Up.css';
import { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/;
const PHONE_REGEX = /\d/g;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Sign_Up = () => {
	const roleRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();

	const [role, setRole] = useState('');
	const [validRole, setValidRole] = useState(false);
	const [roleFocus, setRoleFocus] = useState(false);

	const [user, setUser] = useState('');
	const [validName, setVaildName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [phone, setPhone] = useState('');
	const [validPhone, setValidPhone] = useState(false);
	const [phoneFocus, setPhoneFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		roleRef.current.focus();
	}, []);

	useEffect(() => {
		const result = role && role !== '0';
		setValidRole(result);
	}, [role]);

	useEffect(() => {
		const result = USER_REGEX.test(user);
		setVaildName(result);
	}, [user]);

	useEffect(() => {
		const result = PHONE_REGEX.test(phone) && phone.length === 10;
		setValidPhone(result);
	}, [phone]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
	}, [pwd]);

	useEffect(() => {
		setErrMsg('');
	}, [role, user, phone, email, pwd]);

	const register = async e => {
		e.preventDefault();
		//if button enabled with JS hack
		const v1 = role !== '0';
		const v2 = USER_REGEX.test(user);
		const v3 = EMAIL_REGEX.test(email);
		const v4 = PHONE_REGEX.test(phone);
		const v5 = PWD_REGEX.test(pwd);
		if (!v1 || !v2 || !v3 || !v4 || !v5) {
			// setErrMsg('Invalid Entry');
			console.log(v1, v2, v3, v4, v5);
			return;
		} else {
			// API Call
			const response = await fetch(`${API_URL}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: user,
					email: email,
					password: pwd,
					phone: phone,
				}),
			});

			const json = await response.json();

			if (json.authtoken) {
				sessionStorage.setItem('auth-token', json.authtoken);
				sessionStorage.setItem('role', role);
				sessionStorage.setItem('name', user);

				// phone and email
				sessionStorage.setItem('phone', phone);
				sessionStorage.setItem('email', email);
				// Redirect to home page
				navigate('/'); //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
				window.location.reload();

				// setSuccess(true);
			} else {
				if (json.errors) {
					for (const error of json.errors) {
						setErrMsg(error.msg);
					}
				} else {
					setErrMsg(json.error);
				}
			}
		}
	};

	return (
		<>
			{success ? (
				<section className="flash-screen">
					<FontAwesomeIcon
						icon={faCircleCheck}
						color="#2188f6"
						fontSize="120px"
					/>
					<h1>Success!</h1>
					<p>Signed up! Let's start rocking!</p>
					<button>
						<a href="/login">Sign in</a>
					</button>
				</section>
			) : (
				<section class="sign_up_form">
					<div class="form-title">
						{/* error message  */}
						<p
							ref={errRef}
							className={errMsg ? 'errmsg' : 'offscreen'}
							aria-live="assertive"
						>
							{errMsg}
						</p>
						<h2>Sign Up</h2>
						<p>
							Already a member?{' '}
							<span>
								<a href="../Login/Login.html">Login</a>
							</span>
						</p>
					</div>
					<form method="POST" onSubmit={register}>
						{/* Role */}
						<div class="form-group">
							<label for="role">
								Role
								<span className={validRole ? 'valid' : 'hide'}>
									<FontAwesomeIcon icon={faCheck} color="green" />
								</span>
								<span className={validRole || !role ? 'hide' : 'invalid'}>
									<FontAwesomeIcon icon={faTimes} color="red" />
								</span>
							</label>
							<select
								name="role"
								id="role"
								ref={roleRef}
								required
								aria-invalid={validRole ? 'false' : 'true'}
								aria-describedby="rolenote"
								onChange={e => setRole(e.target.value)}
								onFocus={() => setRoleFocus(true)}
								onBlur={() => setRoleFocus(false)}
							>
								<option value="0">Select Role</option>
								<option value="doctor">Doctor</option>
								<option value="patient">Patient</option>
							</select>
							<p
								id="rolenote"
								className={
									role && roleFocus && !validRole ? 'instructions' : 'offscreen'
								}
							>
								<FontAwesomeIcon icon={faInfoCircle} /> Please select your role{' '}
								<br />
								Are you doctor or patient?
							</p>
						</div>

						{/* name */}
						<div class="form-group">
							<label for="name">
								Name
								<span className={validName ? 'valid' : 'hide'}>
									<FontAwesomeIcon icon={faCheck} color="green" />
								</span>
								<span className={validName || !user ? 'hide' : 'invalid'}>
									<FontAwesomeIcon icon={faTimes} color="red" />
								</span>
							</label>
							<input
								type="text"
								id="name"
								autoComplete="off"
								onChange={e => setUser(e.target.value)}
								required
								placeholder="Enter your name"
								aria-invalid={validName ? 'false' : 'true'}
								aria-describedby="uidnote"
								onFocus={() => setUserFocus(true)}
								onBlur={() => setUserFocus(false)}
							/>
							<p
								id="uidnote"
								className={
									userFocus && user && !validName ? 'instructions' : 'offscreen'
								}
							>
								<FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.{' '}
								<br />
								Must begin with a letter. <br />
								Letters, numbers, underscores,hyphens allowed.
							</p>
						</div>

						{/* phone */}
						<div class="form-group">
							<label for="phone">
								Phone
								<span className={validPhone ? 'valid' : 'hide'}>
									<FontAwesomeIcon icon={faCheck} color="green" />
								</span>
								<span className={validPhone || !phone ? 'hide' : 'invalid'}>
									<FontAwesomeIcon icon={faTimes} color="red" />
								</span>
							</label>
							<input
								className="no-spinners"
								type="number"
								id="phone"
								autoComplete="off"
								placeholder="Enter your phone"
								onChange={e => setPhone(e.target.value)}
								required
								aria-invalid={validPhone ? 'false' : true}
								aria-describedby="phonenote"
								onFocus={e => setPhoneFocus(true)}
								onBlur={e => setPhoneFocus(false)}
							/>
							<p
								id="phonenote"
								className={
									phone && phoneFocus && !validPhone
										? 'instructions'
										: 'offscreen'
								}
							>
								please enter only 10 digits for the phone number.
							</p>
						</div>

						{/* email */}
						<div class="form-group">
							<label for="email">
								Email
								<span className={validEmail ? 'valid' : 'hide'}>
									<FontAwesomeIcon icon={faCheck} color="green" />
								</span>
								<span className={validEmail || !email ? 'hide' : 'invalid'}>
									<FontAwesomeIcon icon={faTimes} color="red" />
								</span>
							</label>
							<input
								type="email"
								id="email"
								placeholder="Enter your email"
								autoComplete="off"
								onChange={e => setEmail(e.target.value)}
								required
								aria-invalid={validEmail ? 'false' : 'true'}
								aria-describedby="emailnote"
								onFocus={e => setEmailFocus(true)}
								onBlur={e => setEmailFocus(false)}
							/>
							<p
								id="emailnote"
								className={
									email && emailFocus && !validEmail
										? 'instructions'
										: 'offscreen'
								}
							>
								<FontAwesomeIcon icon={faInfoCircle} /> Please enter valid email
								such user@example.com
							</p>
						</div>

						{/* password */}
						<div class="form-group">
							<label for="password">
								Password
								<span className={validPwd ? 'valid' : 'hide'}>
									<FontAwesomeIcon icon={faCheck} color="green" />
								</span>
								<span className={validPwd || !pwd ? 'hide' : 'invalid'}>
									<FontAwesomeIcon icon={faTimes} color="red" />
								</span>
							</label>
							<input
								type="password"
								id="password"
								placeholder="Enter your password"
								onChange={e => setPwd(e.target.value)}
								required
								aria-invalid={validPwd ? 'false' : 'true'}
								aria-describedby="pwdnote"
								onFocus={e => setPwdFocus(true)}
								onBlur={e => setPwdFocus(false)}
							/>
							<p
								id="pwdnote"
								className={
									pwd && pwdFocus && !validPwd ? 'instructions' : 'offscreen'
								}
							>
								<FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.{' '}
								<br />
								Must include uppercase and lowercase letter,
								<br /> number, and a special character. <br />
								Allowed special characters:{' '}
								<span aria-label="exclamation mark">!</span>
								<span aria-label="at symbol">@</span>
								<span aria-label="hashtag">#</span>
								<span aria-label="doller sign">$</span>
								<span aria-label="percent">%</span>
							</p>
						</div>

						<div class="btn-group">
							<button
								type="submit"
								disabled={
									!validRole ||
									!validName ||
									!validPhone ||
									!validEmail ||
									!validPwd
										? true
										: false
								}
							>
								Submit
							</button>
							<button type="reset">Reset</button>
						</div>
					</form>
				</section>
			)}
		</>
	);
};

export default Sign_Up;
