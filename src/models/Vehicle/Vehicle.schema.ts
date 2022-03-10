import mongoose from "mongoose";
import { IVehicle, IVehicleModel } from "./Vehicle";
import { createVehicle } from "./Vehicle.statics";

const VehicleSchema = new mongoose.Schema(
	{   
		plate: String
	},
	{
		collection: 'Vehicle',
	},
);

VehicleSchema.statics.createVehicle = createVehicle;

export default VehicleSchema;