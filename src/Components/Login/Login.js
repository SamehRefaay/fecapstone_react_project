import React from 'react';
import './Login.css';

const Login = () => {
	return (
		<>
			<div class="login-form">
				<div class="form-title">
					<h2>Login</h2>
					<p>
						Are you a new member?
						<span>
							<a href="/sign_up">Sign Up Here</a>
						</span>
					</p>
				</div>
				<form action="">
					<div class="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							required
							autoComplete="off"
							placeholder="Enter your email"
						/>
					</div>
					<div class="form-group">
						<label for="name">Password</label>
						<input
							id="password"
							type="password"
							required
							placeholder="Enter your password"
						/>
					</div>
					<div class="btn-group">
						<button type="submit">Submit</button>
						<button type="reset">Reset</button>
					</div>
					<div class="form-text">
						<a href="#">Forget Password?</a>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
