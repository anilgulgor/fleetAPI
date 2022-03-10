import mongoose = require('mongoose');
import { VehicleModel } from './../models/Vehicle/Vehicle.model';

export const startConnection = () => {

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