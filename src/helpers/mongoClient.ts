import mongoose = require('mongoose');

export const startConnection = () => {
	//console.log(`${process.env.mongoHost}:${process.env.mongoPort}/${process.env.dbName}`)

	const db: mongoose.Connection = mongoose.connection;

	try {
		mongoose.connect(`${process.env.MONGO_HOST}`);

	} catch (err) {
		throw err;
	}

	db.once('open', () => {
		console.log(`MongoDB connected successfully at ${process.env.MONGO_HOST}`);
	});

	db.on('error', (error) => {
		console.log('An error occured while connecting MongoDB');
		throw new Error(error);
	});

	db.on('disconnected', function () {
		console.log('MongoDB event disconnected');
	});

	db.on('reconnected', function () {
		console.log('MongoDB event reconnected');
	});
};