import React from 'react';
import './ReportsLayout.css';

const fakeData = [
	{ name: 'Dr. John Doe', speciality: 'Cardiology' },
	{ name: 'Dr. Jane Smith', speciality: 'Dermatology' },
];

const ReportsLayout = () => {
	return (
		<div className="reports-page">
			<div className="reports-container">
				<h2>Reports</h2>
				<table>
					<tr>
						<th>Serial Number</th>
						<th>Doctor Name</th>
						<th>Doctor Speciality</th>
						<th>View Report</th>
						<th>Download Report</th>
					</tr>
					{fakeData.map((doctor, i) => (
						<tr>
							<td>{i + 1}</td>
							<td>{doctor.name}</td>
							<td>{doctor.speciality}</td>
							<td>
								<button>View Report</button>
							</td>
							<td>
								<button>Download Report</button>
							</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default ReportsLayout;
