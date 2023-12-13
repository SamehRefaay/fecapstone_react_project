import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" Component={Landing_Page} />
					<Route path="/sign_up" Component={Sign_Up} />
					<Route path="/login" Component={Login} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
