import React, { useRef, useState } from 'react';
import './Login.css';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';

const Login = () => {
	const emailRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();

	const [email, setEmail] = useState();
	const [pwd, setPwd] = useState();

	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const login = async e => {
		e.preventDefault();
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
				setSuccess(true);
				if (success) {
					navigate('/');
					window.location.reload();
				}
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
	};

	const reset = () => {
		setEmail('');
		setPwd('');
		setErrMsg('');
		setSuccess(false);
	};

	return (
		<>
			{!success && errMsg ? (
				<section className="flash-screen">
					<FontAwesomeIcon icon={faTimesCircle} color="red" fontSize="120px" />
					<h1>Oops!</h1>
					<p>Some thing is fishy. {errMsg}</p>
					<button onClick={reset}>Try Again</button>
				</section>
			) : (
				<seciton class="login-form">
					<div class="form-title">
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
						<div class="form-group">
							<label htmlFor="email">Email</label>
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
							/>
						</div>
						<div class="form-group">
							<label htmlFor="password">Password</label>
							<input
								id="password"
								name="password"
								type="password"
								value={pwd}
								required
								className="form-control"
								onChange={e => setPwd(e.target.value)}
								placeholder="Enter your password"
							/>
						</div>
						<div class="btn-group">
							<button type="submit">Submit</button>
							<button type="reset">Reset</button>
						</div>
						<div class="form-text">
							<Link to="#">Forget Password?</Link>
						</div>
					</form>
				</seciton>
			)}
		</>
	);
};

export default Login;
