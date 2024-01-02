import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Landing_Page/LandingPage';
import SignUp from './components/Sign_Up/SignUp';
import Login from './components/Login/Login';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BestServices from './components/Best_Services/BestServices';
import RequireAuth from './components/RequireAuth';
import AppointmentBooking from './components/AppointmentBooking/AppointmentBooking';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ProfileCard from './components/ProfileCard/ProfileCard';
import ReportsLayout from './components/ReportsLayout/ReportsLayout';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Notification />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/instant-consultation"
						element={
							<RequireAuth>
								<InstantConsultation />
							</RequireAuth>
						}
					/>
					<Route
						path="appointment-booking"
						element={
							<RequireAuth>
								<AppointmentBooking />
							</RequireAuth>
						}
					/>
					<Route path="/best-services" element={<BestServices />} />
					<Route path="/reviews" element={<ReviewForm />} />
					<Route path="/profile" element={<ProfileCard />} />
					<Route path="/reports" element={<ReportsLayout />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
