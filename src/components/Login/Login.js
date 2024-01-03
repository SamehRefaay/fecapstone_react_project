import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faInfoCircle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
	const location = useLocation();
	const redirectPath = location.state?.path || '/';

	const emailRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}/;
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
	}, [pwd]);

	const login = async e => {
		e.preventDefault();

		const v1 = EMAIL_REGEX.test(email);
		const v2 = PWD_REGEX.test(pwd);

		if (!v1 || !v2) {
			// setErrMsg('Invalid Entry');
			console.log(v1, v2);
			return;
		} else {
			try {
				const res = await fetch(`${API_URL}/api/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						// name: name,
						email: email,
						password: pwd,
					}),
				});
				const json = await res.json();
				if (json.authtoken) {
					sessionStorage.setItem('auth-token', json.authtoken);
					sessionStorage.setItem('email', email);
					navigate(redirectPath, { replace: true });
					window.location.reload();
				} else {
					if (json.errors) {
						for (const error of json.errors) {
							alert(error.msg);
						}
					} else {
						alert(json.error);
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const reset = () => {
		setEmail('');
		setPwd('');
		setErrMsg('');
	};

	return (
		<section>
			<div className="container">
				<div className="login-form">
					<div className="form-title">
						<p
							ref={errRef}
							className={errMsg ? 'errMsg' : 'offscreen'}
							aria-live="assertive"
						>
							{errMsg}
						</p>
						<h2>Login</h2>
						<p>
							Are you a new member?
							<span>
								<a href="/signup">Sign Up Here</a>
							</span>
						</p>
					</div>
					<form onSubmit={login} onReset={reset}>
						<div className="form-group">
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
								id="email"
								name="email"
								type="email"
								value={email}
								ref={emailRef}
								required
								onChange={e => setEmail(e.target.value)}
								className="form-control"
								autoComplete="off"
								placeholder="Enter your email"
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
						<div className="form-group">
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
								id="password"
								name="password"
								type="password"
								value={pwd}
								required
								className="form-control"
								onChange={e => setPwd(e.target.value)}
								placeholder="Enter your password"
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
						<div className="btn-group">
							<button type="submit">Submit</button>
							<button type="reset">Reset</button>
						</div>
						<div className="form-text">
							<Link to="#">Forget Password?</Link>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
