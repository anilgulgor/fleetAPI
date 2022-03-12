import mongoose from "mongoose";

export interface IVehicle {
    plate: String;
}

export interface IVehicleDocument extends IVehicle, mongoose.Document { }
export interface IVehicleModel extends mongoose.Model<IVehicleDocument> {
	createVehicle({ plate }: { plate: String }): Promise<IVehicleDocument>;
	isVehicleAvailable({ plate }: { plate: String }): Promise<IVehicleDocument | null>;
}