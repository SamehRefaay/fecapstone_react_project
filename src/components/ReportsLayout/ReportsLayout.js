import React from 'react';
import './ReportsLayout.css';

const doctors = [
	{ name: 'Dr. John Doe', speciality: 'Cardiology' },
	{ name: 'Dr. Jane Smith', speciality: 'Dermatology' },
];

const ReportsLayout = () => {
	const REPORT_FILE_URL = 'http://localhost:3000/report.pdf';

	const downloadReportFile = url => {
		const fileName = url.split('/').pop();
		const aTag = document.createElement('a');
		aTag.href = url;
		aTag.setAttribute('download', fileName);
		document.body.appendChild(aTag);
		aTag.click();
		aTag.remove();
	};
	const reviewReportFile = url => {
		const aTag = document.createElement('a');
		aTag.href = url;
		aTag.setAttribute('target', '_blank');
		aTag.setAttribute('rel', 'noreferrer');
		document.body.appendChild(aTag);
		aTag.click();
		aTag.remove();
	};

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
					{doctors.map((doctor, i) => (
						<tr>
							<td>{i + 1}</td>
							<td>{doctor.name}</td>
							<td>{doctor.speciality}</td>
							<td>
								<button
									onClick={() => {
										reviewReportFile(REPORT_FILE_URL);
									}}
								>
									View Report
								</button>
							</td>
							<td>
								<button
									onClick={() => {
										downloadReportFile(REPORT_FILE_URL);
									}}
								>
									Download Report
								</button>
							</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default ReportsLayout;
