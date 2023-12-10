const mongoose = require('mongoose');
// username: sa------aay89 password: gjLzIAXltftFr1Fc // gjLzIAXltftFr1Fc
// url mongodb+srv://samehrefaay89:<password>@cluster0.bfsrlxw.mongodb.net/?retryWrites=true&w=majority
// const mongoURI = 'mongodb://root:<password>@127.0.0.1:27017';
const mongoURI =
	'mongodb+srv://samehrefaay89:gjLzIAXltftFr1Fc@cluster0.bfsrlxw.mongodb.net/?retryWrites=true&w=majority';

const connectToMongo = async retryCount => {
	const MAX_RETRIES = 3;
	const count = retryCount ?? 0;
	try {
		await mongoose.connect(mongoURI, { dbName: 'stayhealthybeta1' });
		console.info('Connected to Mongo Successfully');

		return;
	} catch (error) {
		console.error(error);

		const nextRetryCount = count + 1;

		if (nextRetryCount >= MAX_RETRIES) {
			throw new Error('Unable to connect to Mongo!');
		}

		console.info(`Retrying, retry count: ${nextRetryCount}`);

		return await connectToMongo(nextRetryCount);
	}
};

module.exports = connectToMongo;
