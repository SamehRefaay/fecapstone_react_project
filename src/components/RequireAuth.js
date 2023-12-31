import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const [user, setUser] = useState(sessionStorage.getItem('email'));
	console.log('requide auth :', user);

	if (!user)
		return <Navigate to="/login" state={{ path: location.pathname }} replace />;
	return children;
};

export default RequireAuth;
