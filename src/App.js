import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" Component={Landing_Page} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
