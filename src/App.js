import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Landing_Page/LandingPage';
import SignUp from './components/Sign_Up/SignUp';
import Login from './components/Login/Login';
import InstantConsultation from './components/InstantConsultationBooking/InstantConsultation';
import BestServices from './components/Best_Services/BestServices';
import AuthProvider from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AuthProvider>
					<Navbar />
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
						<Route path="/best-services" element={<BestServices />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
