import male1 from '../assets/images/male-doctor1.jpeg';
import male2 from '../assets/images/male-doctor2.jpeg';
import male3 from '../assets/images/male-doctor3.jpeg';
import male4 from '../assets/images/male-doctor4.jpeg';
import female1 from '../assets/images/female-doctor1.jpeg';
import female2 from '../assets/images/female-doctor2.jpeg';
import female3 from '../assets/images/female-doctor3.jpeg';
import female4 from '../assets/images/female-doctor4.jpeg';

export const getDoctorImage = name => {
	const i = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
	var doctorsImages = [];
	if (
		name.toLowerCase().includes('jiao') ||
		name.toLowerCase().includes('jessica') ||
		name.toLowerCase().includes('sarah') ||
		name.toLowerCase().includes('stephny') ||
		name.toLowerCase().includes('elizabeth') ||
		name.toLowerCase().includes('emily') ||
		name.toLowerCase().includes('samantha') ||
		name.toLowerCase().includes('rachel')
	) {
		doctorsImages = [female1, female2, female3, female4];
		return doctorsImages[i];
	}
	doctorsImages = [male1, male2, male3, male4];
	return doctorsImages[i];
};

export const getDateFormat = dateString => {
	// const a = dateString.split(' ');
	// const date = `${a[0]} ${a[1]} ${a[2]} ${a[3]}`;
	return dateString.split('T')[0];
};
